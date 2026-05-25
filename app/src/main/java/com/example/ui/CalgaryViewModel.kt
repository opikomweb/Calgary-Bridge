package com.example.ui

import android.app.Application
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import androidx.room.Room
import com.example.data.AppDatabase
import com.example.data.Bookmark
import com.example.data.GeminiClient
import com.example.data.Localization
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class CalgaryViewModel(application: Application) : AndroidViewModel(application) {

    // 1. Room Local Database Access
    private val db = Room.databaseBuilder(
        application,
        AppDatabase::class.java,
        "calgary_bridge_db"
    ).fallbackToDestructiveMigration(dropAllTables = true).build()

    private val bookmarkDao = db.bookmarkDao()

    // Observe bookmarks reactively
    val bookmarksState: StateFlow<List<Bookmark>> = bookmarkDao.getAllBookmarks()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    // Local transient notes for latency-free typing and SQLite debouncing
    private val _localNotes = MutableStateFlow<Map<String, String>>(emptyMap())
    val localNotes: StateFlow<Map<String, String>> = _localNotes.asStateFlow()

    private val _isSavingNotes = MutableStateFlow(false)
    val isSavingNotes: StateFlow<Boolean> = _isSavingNotes.asStateFlow()

    private val noteUpdateJobs = java.util.concurrent.ConcurrentHashMap<String, kotlinx.coroutines.Job>()

    // 2. Local State Management
    private val _userLanguage = MutableStateFlow("en")
    val userLanguage: StateFlow<String> = _userLanguage.asStateFlow()

    private val _selectedGroup = MutableStateFlow("newcomer")
    val selectedGroup: StateFlow<String> = _selectedGroup.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _aiInput = MutableStateFlow("")
    val aiInput: StateFlow<String> = _aiInput.asStateFlow()

    private val _aiOutput = MutableStateFlow<String?>(null)
    val aiOutput: StateFlow<String?> = _aiOutput.asStateFlow()

    private val _isAiLoading = MutableStateFlow(false)
    val isAiLoading: StateFlow<Boolean> = _isAiLoading.asStateFlow()

    // 3. Methods to update status
    fun setLanguage(langCode: String) {
        _userLanguage.value = langCode
        // Automatically refresh or clear AI results to reflect the new language fallback if empty
        _aiOutput.value = null
    }

    fun setGroup(groupKey: String) {
        _selectedGroup.value = groupKey
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun setAiInput(input: String) {
        _aiInput.value = input
    }
    
    fun clearAiOutput() {
        _aiOutput.value = null
    }

    // 4. Bookmark operations
    fun toggleBookmark(resourceId: String, title: String, defaultCategory: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val exists = bookmarksState.value.any { it.id == resourceId }
                if (exists) {
                    // Also remove if active locally
                    _localNotes.value = _localNotes.value - resourceId
                    noteUpdateJobs[resourceId]?.cancel()
                    noteUpdateJobs.remove(resourceId)

                    bookmarkDao.deleteBookmark(resourceId)
                } else {
                    bookmarkDao.insertBookmark(
                        Bookmark(
                            id = resourceId,
                            category = defaultCategory,
                            title = title,
                            note = "",
                            isCompleted = false
                        )
                    )
                }
            } catch (e: Exception) {
                Log.e("CalgaryViewModel", "Error toggling bookmark: ${e.message}", e)
            }
        }
    }

    fun updateBookmarkNote(resourceId: String, category: String, title: String, noteText: String) {
        // Snappy in-memory update for fluid UX
        _localNotes.value = _localNotes.value + (resourceId to noteText)
        _isSavingNotes.value = true

        // Cancel previous pending SQL write and schedule the new one after a 500ms delay
        noteUpdateJobs[resourceId]?.cancel()
        noteUpdateJobs[resourceId] = viewModelScope.launch(Dispatchers.IO) {
            try {
                kotlinx.coroutines.delay(500)
                bookmarkDao.insertBookmark(
                    Bookmark(
                        id = resourceId,
                        category = category,
                        title = title,
                        note = noteText,
                        isCompleted = bookmarksState.value.find { it.id == resourceId }?.isCompleted ?: false
                    )
                )
            } catch (e: Exception) {
                Log.e("CalgaryViewModel", "Failed to auto-save note", e)
            } finally {
                // Ensure we always clean up and update the saving status even if canceled or error occurs
                noteUpdateJobs.remove(resourceId)
                _isSavingNotes.value = noteUpdateJobs.isNotEmpty()
            }
        }
    }

    fun toggleBookmarkCompletion(resourceId: String, category: String, title: String, isCompleted: Boolean) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                // Respect the latest local typed note instead of potentially stale DB note
                val existingNote = _localNotes.value[resourceId] 
                    ?: bookmarksState.value.find { it.id == resourceId }?.note 
                    ?: ""
                bookmarkDao.insertBookmark(
                    Bookmark(
                        id = resourceId,
                        category = category,
                        title = title,
                        note = existingNote,
                        isCompleted = isCompleted
                    )
                )
            } catch (e: Exception) {
                Log.e("CalgaryViewModel", "Error toggling bookmark completion: ${e.message}", e)
            }
        }
    }

    fun removeBookmark(resourceId: String) {
        _localNotes.value = _localNotes.value - resourceId
        noteUpdateJobs[resourceId]?.cancel()
        noteUpdateJobs.remove(resourceId)

        viewModelScope.launch(Dispatchers.IO) {
            try {
                bookmarkDao.deleteBookmark(resourceId)
            } catch (e: Exception) {
                Log.e("CalgaryViewModel", "Error removing bookmark: ${e.message}", e)
            }
        }
    }

    // 5. Solution-Oriented Gemini Advisor Action
    fun getCalgaryAiAdvice() {
        val prompt = _aiInput.value.trim()
        val group = _selectedGroup.value
        val lang = _userLanguage.value
        
        if (prompt.isEmpty()) return

        _isAiLoading.value = true
        _aiOutput.value = null

        viewModelScope.launch {
            try {
                val advice = withContext(Dispatchers.IO) {
                    GeminiClient.getCalgaryAdvice(prompt, group, lang)
                }
                _aiOutput.value = advice
            } catch (e: Exception) {
                _aiOutput.value = "An unexpected error occurred: ${e.message}"
            } finally {
                _isAiLoading.value = false
            }
        }
    }

    // Direct Quick-Help recommendations preset
    fun applyPresetAiPrompt(presetText: String) {
        _aiInput.value = presetText
        getCalgaryAiAdvice()
    }
}
