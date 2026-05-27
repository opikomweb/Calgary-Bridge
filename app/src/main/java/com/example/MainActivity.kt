package com.example

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.BorderStroke
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.graphics.asComposePath
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.draw.scale
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.ui.composed
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Create
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Done
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.surfaceColorAtElevation
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Bookmark
import com.example.data.Localization
import com.example.ui.CalgaryViewModel
import com.example.ui.theme.*

class MainActivity : ComponentActivity() {
    private val viewModel: CalgaryViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                CalgaryAppContent(viewModel)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun CalgaryAppContent(viewModel: CalgaryViewModel) {
    val context = LocalContext.current
    val keyboardController = LocalSoftwareKeyboardController.current

    // Observe state from ViewModel
    val activeLang by viewModel.userLanguage.collectAsState()
    val activeGroup by viewModel.selectedGroup.collectAsState()
    val searchVal by viewModel.searchQuery.collectAsState()
    val aiPromptInput by viewModel.aiInput.collectAsState()
    val aiResponseOutput by viewModel.aiOutput.collectAsState()
    val loadingStatus by viewModel.isAiLoading.collectAsState()
    val userSavedShortlist by viewModel.bookmarksState.collectAsState()
    val localNotes by viewModel.localNotes.collectAsState()
    val isSavingNotes by viewModel.isSavingNotes.collectAsState()

    // Screen-level navigation Tab state ("resources", "ai", "shortlist")
    var currentTab by remember { mutableStateOf("resources") }

    // Dropdown visibility for language switcher
    var langMenuExpanded by remember { mutableStateOf(false) }

    var appState by remember { mutableStateOf("splash") } // "splash", "onboarding", "main"
    var emergencyModeActive by remember { mutableStateOf(false) }
    var selectedOnboardingRole by remember { mutableStateOf("") }
    var selectedOnboardingNeeds by remember { mutableStateOf(setOf<String>()) }

    when (appState) {
        "splash" -> {
            CalgarySplash(onSplashComplete = {
                appState = "onboarding"
            })
        }
        "onboarding" -> {
            CalgaryOnboarding(
                activeLang = activeLang,
                onOnboardingComplete = { role, needs ->
                    selectedOnboardingRole = role
                    selectedOnboardingNeeds = needs
                    if (role == "emergency") {
                        emergencyModeActive = true
                        viewModel.setGroup("newcomer")
                    } else if (role == "newcomer" || role == "senior" || role == "business" || role == "ngo") {
                        viewModel.setGroup(role)
                    } else {
                        viewModel.setGroup("newcomer")
                    }
                    appState = "main"
                }
            )
        }
        "main" -> {
            Scaffold(
                modifier = Modifier.fillMaxSize(),
                containerColor = if (emergencyModeActive) Color(0xFF1E0E0E) else NaturalBg,
                bottomBar = {
                    if (!emergencyModeActive) {
                        NavigationBar(
                            modifier = Modifier.fillMaxWidth(),
                            containerColor = Color(0xFF0F172A),
                            tonalElevation = 0.dp
                        ) {
                            val navItemColors = androidx.compose.material3.NavigationBarItemDefaults.colors(
                                selectedIconColor = Color(0xFF38BDF8),
                                selectedTextColor = Color(0xFF38BDF8),
                                indicatorColor = Color.White.copy(alpha = 0.1f),
                                unselectedIconColor = Color.White.copy(alpha = 0.5f),
                                unselectedTextColor = Color.White.copy(alpha = 0.5f)
                            )
                            NavigationBarItem(
                                selected = currentTab == "resources",
                                onClick = { currentTab = "resources" },
                                label = { Text(Localization.getString("nav_explore", activeLang), fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                                icon = { Icon(Icons.Default.Home, contentDescription = "Resources") },
                                colors = navItemColors,
                                modifier = Modifier.testTag("tab_explore")
                            )
                            NavigationBarItem(
                                selected = currentTab == "ai",
                                onClick = { currentTab = "ai" },
                                label = { Text(Localization.getString("nav_ai", activeLang), fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                                icon = { Icon(Icons.Default.Face, contentDescription = "AI Guide") },
                                colors = navItemColors,
                                modifier = Modifier.testTag("tab_ai")
                            )
                            NavigationBarItem(
                                selected = currentTab == "shortlist",
                                onClick = { currentTab = "shortlist" },
                                label = { Text(Localization.getString("nav_bookmarks", activeLang), fontSize = 11.sp, fontWeight = FontWeight.Bold) },
                                colors = navItemColors,
                                icon = {
                                    Box {
                                        Icon(Icons.Default.Favorite, contentDescription = "Shortlist")
                                        if (userSavedShortlist.isNotEmpty()) {
                                            Box(
                                                modifier = Modifier
                                                    .size(14.dp)
                                                    .background(Color(0xFFE11D48), CircleShape)
                                                    .align(Alignment.TopEnd)
                                            ) {
                                                Text(
                                                    text = userSavedShortlist.size.toString(),
                                                    color = Color.White,
                                                    fontSize = 9.sp,
                                                    fontWeight = FontWeight.Bold,
                                                    modifier = Modifier.align(Alignment.Center)
                                                )
                                            }
                                        }
                                    }
                                },
                                modifier = Modifier.testTag("tab_shortlist")
                            )
                        }
                    }
                }
            ) { innerPadding ->
                if (emergencyModeActive) {
                    EmergencyDashboard(
                        activeLang = activeLang,
                        viewModel = viewModel,
                        onExit = { emergencyModeActive = false }
                    )
                } else {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF0F172A), // Dark slate
                            Color(0xFF0B1021)
                        )
                    )
                )
        ) {
            // Elegant background shapes
            androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
                drawCircle(
                    brush = Brush.radialGradient(
                        colors = listOf(Color(0xFFE11D48).copy(alpha = 0.08f), Color.Transparent),
                        center = androidx.compose.ui.geometry.Offset(size.width, 0f),
                        radius = size.width * 0.7f
                    ),
                    radius = size.width * 0.7f,
                    center = androidx.compose.ui.geometry.Offset(size.width, 0f)
                )
            }
            
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                // -- SPONSOR ACCENT BAR --
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFFE11D48).copy(alpha = 0.8f))
                        .padding(horizontal = 16.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = Localization.getString("sponsor", activeLang).uppercase(),
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                    Text(
                        text = "Calgary, AB",
                        color = Color.White.copy(alpha = 0.8f),
                        fontSize = 11.sp,
                    )
                }

                // -- APP BAR (Brand Header + Language Selector) --
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = Localization.getString("app_title", activeLang),
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White, // changed for darkness
                            letterSpacing = (-0.5).sp
                        )
                        Text(
                            text = Localization.getString("welcome_statement", activeLang),
                            fontSize = 12.sp,
                            color = Color(0xFFE2E8F0),
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis,
                            lineHeight = 16.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    // Language Button Dropdown
                    Box {
                        val currentLangObj = Localization.ListOfLanguages.find { it.code == activeLang }
                            ?: Localization.ListOfLanguages[0]
                        Surface(
                            onClick = { langMenuExpanded = true },
                            shape = RoundedCornerShape(24.dp),
                            color = Color.White.copy(alpha = 0.1f),
                            border = BorderStroke(1.dp, Color.White.copy(alpha = 0.2f)),
                            modifier = Modifier
                                .testTag("language_selector")
                                .sizeIn(minWidth = 48.dp, minHeight = 48.dp),
                            shadowElevation = 0.dp
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "${currentLangObj.flag}  ${currentLangObj.name.take(3).uppercase()}",
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = Color.White
                                )
                                Icon(
                                    imageVector = Icons.Default.KeyboardArrowDown,
                                    contentDescription = "Languages List",
                                    tint = Color.White,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }

                        DropdownMenu(
                        expanded = langMenuExpanded,
                        onDismissRequest = { langMenuExpanded = false }
                    ) {
                        Localization.ListOfLanguages.forEach { lang ->
                            DropdownMenuItem(
                                text = {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(text = lang.flag, fontSize = 18.sp)
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Text(text = lang.name, fontWeight = if (lang.code == activeLang) FontWeight.Bold else FontWeight.Normal)
                                    }
                                },
                                onClick = {
                                    viewModel.setLanguage(lang.code)
                                    langMenuExpanded = false
                                }
                            )
                        }
                    }
                }
            }

            // -- DEMOGRAPHIC COMMUNITY SELECTOR (Curated row of chips for Calgary Groups) --
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp)
            ) {
                Text(
                    text = Localization.getString("select_group", activeLang).uppercase(),
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White.copy(alpha = 0.6f),
                    letterSpacing = 1.sp,
                    modifier = Modifier.padding(bottom = 6.dp)
                )

                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    val groups = listOf(
                        "newcomer" to "group_newcomer",
                        "senior" to "group_senior",
                        "business" to "group_business",
                        "ngo" to "group_ngo",
                        "creator" to "group_creator"
                    )

                    items(groups) { (groupKey, stringKey) ->
                        val isSelected = activeGroup == groupKey
                        FilterChip(
                            modifier = Modifier.testTag("group_$groupKey"),
                            selected = isSelected,
                            onClick = { viewModel.setGroup(groupKey) },
                            label = {
                                Text(
                                    text = Localization.getString(stringKey, activeLang),
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                                )
                            },
                            leadingIcon = {
                                val em = when (groupKey) {
                                    "newcomer" -> "🎒"
                                    "senior" -> "👵"
                                    "business" -> "💼"
                                    "ngo" -> "🤝"
                                    else -> "🎨"
                                }
                                Text(em, fontSize = 14.sp)
                            },
                            border = FilterChipDefaults.filterChipBorder(
                                enabled = true,
                                selected = isSelected,
                                borderColor = Color.White.copy(alpha = 0.2f),
                                selectedBorderColor = Color(0xFFE11D48).copy(alpha = 0.6f)
                            ),
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = Color(0xFFE11D48).copy(alpha = 0.2f),
                                selectedLabelColor = Color.White,
                                containerColor = Color.White.copy(alpha = 0.05f),
                                labelColor = Color.White.copy(alpha = 0.8f)
                            )
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // -- PRIMARY TAB BODY --
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(horizontal = 16.dp)
            ) {
                when (currentTab) {
                    "resources" -> {
                        // EXPLORE STATIC CALGARY CONNECT RESOURCES
                        Column(modifier = Modifier.fillMaxSize()) {
                            // Search Box
                            OutlinedTextField(
                                value = searchVal,
                                onValueChange = { viewModel.setSearchQuery(it) },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .testTag("search_input"),
                                placeholder = { Text(Localization.getString("search_label", activeLang)) },
                                leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search Icon") },
                                trailingIcon = {
                                    if (searchVal.isNotEmpty()) {
                                        IconButton(onClick = { viewModel.setSearchQuery("") }) {
                                            Icon(Icons.Default.Clear, contentDescription = "Clear search")
                                        }
                                    }
                                },
                                singleLine = true,
                                shape = RoundedCornerShape(16.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Color(0xFF38BDF8),
                                    unfocusedBorderColor = Color.White.copy(alpha = 0.2f),
                                    focusedContainerColor = Color.White.copy(alpha = 0.1f),
                                    unfocusedContainerColor = Color.White.copy(alpha = 0.05f),
                                    focusedTextColor = Color.White,
                                    unfocusedTextColor = Color.White,
                                    focusedLeadingIconColor = Color.White.copy(alpha = 0.8f),
                                    unfocusedLeadingIconColor = Color.White.copy(alpha = 0.6f)
                                )
                            )

                            Spacer(modifier = Modifier.height(12.dp))

                            val filteredList = Localization.ResourcesList.filter { res ->
                                res.category == activeGroup &&
                                        ((res.titles[activeLang] ?: res.titles["en"] ?: "").contains(searchVal, ignoreCase = true) ||
                                                (res.descriptions[activeLang] ?: res.descriptions["en"] ?: "").contains(searchVal, ignoreCase = true))
                            }

                            if (filteredList.isEmpty()) {
                                // Empty state
                                Column(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .padding(32.dp),
                                    verticalArrangement = Arrangement.Center,
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Warning,
                                        contentDescription = "No results found",
                                        tint = Color.White.copy(alpha = 0.4f),
                                        modifier = Modifier.size(48.dp)
                                    )
                                    Spacer(modifier = Modifier.height(12.dp))
                                    Text(
                                        text = "No direct listings fit your query.\nTry switching community groups above!",
                                        fontSize = 14.sp,
                                        color = Color(0xFF94A3B8),
                                        textAlign = TextAlign.Center
                                    )
                                }
                            } else {
                                LazyColumn(
                                    verticalArrangement = Arrangement.spacedBy(12.dp),
                                    modifier = Modifier.fillMaxSize()
                                ) {
                                    items(filteredList) { res ->
                                        val titleText = res.titles[activeLang] ?: res.titles["en"] ?: ""
                                        val descText = res.descriptions[activeLang] ?: res.descriptions["en"] ?: ""
                                        val isBookmarked = userSavedShortlist.any { it.id == res.id }

                                        Card(
                                            shape = RoundedCornerShape(24.dp),
                                            colors = CardDefaults.cardColors(
                                                containerColor = Color.White.copy(alpha = 0.05f)
                                            ),
                                            border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
                                            elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                                            modifier = Modifier.fillMaxWidth()
                                        ) {
                                            Column(modifier = Modifier.padding(18.dp)) {
                                                Row(
                                                    modifier = Modifier.fillMaxWidth(),
                                                    horizontalArrangement = Arrangement.SpaceBetween,
                                                    verticalAlignment = Alignment.Top
                                                ) {
                                                    Column(modifier = Modifier.weight(1f)) {
                                                        Text(
                                                            text = titleText,
                                                            fontSize = 17.sp,
                                                            fontWeight = FontWeight.Bold,
                                                            color = Color.White
                                                        )
                                                        Text(
                                                            text = "✅ Official Source: ${res.webUrl.replace("https://", "")}",
                                                            fontSize = 11.sp,
                                                            fontWeight = FontWeight.Bold,
                                                            color = Color(0xFF38BDF8)
                                                        )
                                                    }
                                                    
                                                    // Quick Bookmark option to plan
                                                    IconButton(
                                                        onClick = {
                                                            viewModel.toggleBookmark(
                                                                res.id,
                                                                titleText,
                                                                res.category
                                                            )
                                                            Toast.makeText(
                                                                context,
                                                                if (isBookmarked) "Removed from shortlist" else "Added to your personalized checklist plan!",
                                                                Toast.LENGTH_SHORT
                                                            ).show()
                                                        }
                                                    ) {
                                                        Icon(
                                                            imageVector = if (isBookmarked) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                                                            contentDescription = "Save to plan",
                                                            tint = if (isBookmarked) Color(0xFFE11D48) else Color.White.copy(alpha = 0.4f)
                                                        )
                                                    }
                                                }

                                                Spacer(modifier = Modifier.height(8.dp))

                                                Text(
                                                    text = descText,
                                                    fontSize = 13.sp,
                                                    color = Color(0xFFE2E8F0),
                                                    lineHeight = 18.sp,
                                                    fontWeight = FontWeight.Medium
                                                )


                                                Spacer(modifier = Modifier.height(12.dp))

                                                // Solution action buttons
                                                Row(
                                                    modifier = Modifier.fillMaxWidth(),
                                                    horizontalArrangement = Arrangement.End,
                                                    verticalAlignment = Alignment.CenterVertically
                                                ) {
                                                    if (res.phone.isNotEmpty()) {
                                                        OutlinedButton(
                                                            onClick = {
                                                                try {
                                                                    val dialIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${res.phone}"))
                                                                    context.startActivity(dialIntent)
                                                                } catch (e: Exception) {
                                                                    Toast.makeText(context, "No dialing app found", Toast.LENGTH_SHORT).show()
                                                                }
                                                            },
                                                            modifier = Modifier.height(36.dp),
                                                            colors = ButtonDefaults.outlinedButtonColors(
                                                                contentColor = Color(0xFF38BDF8)
                                                            ),
                                                            border = androidx.compose.foundation.BorderStroke(
                                                                1.dp,
                                                                Color(0xFF38BDF8).copy(alpha = 0.5f)
                                                            ),
                                                            contentPadding = PaddingValues(horizontal = 12.dp),
                                                            shape = RoundedCornerShape(12.dp)
                                                        ) {
                                                            Icon(
                                                                Icons.Default.Phone,
                                                                contentDescription = "Call",
                                                                modifier = Modifier.size(14.dp)
                                                            )
                                                            Spacer(modifier = Modifier.width(4.dp))
                                                            Text(
                                                                text = Localization.getString("call_btn", activeLang),
                                                                fontSize = 12.sp,
                                                                fontWeight = FontWeight.Bold
                                                            )
                                                        }
                                                        Spacer(modifier = Modifier.width(8.dp))
                                                    }

                                                    Button(
                                                        onClick = {
                                                            try {
                                                                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(res.webUrl))
                                                                context.startActivity(browserIntent)
                                                            } catch (e: Exception) {
                                                                Toast.makeText(context, "No web browser found", Toast.LENGTH_SHORT).show()
                                                            }
                                                        },
                                                        colors = ButtonDefaults.buttonColors(
                                                            containerColor = Color(0xFF38BDF8),
                                                            contentColor = Color(0xFF0B1021)
                                                        ),
                                                        modifier = Modifier.height(36.dp),
                                                        contentPadding = PaddingValues(horizontal = 12.dp),
                                                        shape = RoundedCornerShape(12.dp)
                                                    ) {
                                                        Text(text = "Visit Site", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    "ai" -> {
                        // SOLUTION ORIENTED AI CALGARY CHAT GUIDE
                        Column(
                            modifier = Modifier.fillMaxSize(),
                            verticalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Text(
                                text = Localization.getString("ai_intro", activeLang),
                                fontSize = 13.sp,
                                color = Color(0xFFE2E8F0),
                                lineHeight = 18.sp,
                                fontWeight = FontWeight.Medium
                            )

                            // Direct one-click question helpers representing selected community group
                            Column {
                                val currentPresetQuestions = when (activeGroup) {
                                    "newcomer" -> listOf(
                                        "How to apply for transit pass?",
                                        "Where to get health insurance?"
                                    )
                                    "senior" -> listOf(
                                        "Is there free transport help?",
                                        "Kerby Centre senior housing help"
                                    )
                                    "business" -> listOf(
                                        "Starting a home business in Calgary",
                                        "Alberta small business grants info"
                                    )
                                    "ngo" -> listOf(
                                        "How to recruit volunteers in Calgary?",
                                        "Calgary communities federation grants"
                                    )
                                    else -> listOf(
                                        "Calgary arts council funding guidelines",
                                        "How to find art studios in Calgary"
                                    )
                                }

                                Text(
                                    text = "💡 QUICK PRESETS:",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF38BDF8),
                                    modifier = Modifier.padding(bottom = 4.dp)
                                )

                                FlowRow(
                                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                                    verticalArrangement = Arrangement.spacedBy(4.dp)
                                ) {
                                    currentPresetQuestions.forEach { preset ->
                                        Surface(
                                            onClick = {
                                                viewModel.applyPresetAiPrompt(preset)
                                            },
                                            shape = RoundedCornerShape(16.dp),
                                            color = Color.White.copy(alpha = 0.1f),
                                            border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
                                            modifier = Modifier.testTag("preset_${preset.replace(" ", "_").lowercase()}")
                                        ) {
                                            Text(
                                                text = preset,
                                                fontSize = 11.sp,
                                                fontWeight = FontWeight.SemiBold,
                                                color = Color.White,
                                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                            )
                                        }
                                    }
                                }
                            }

                            // Dynamic Input Box & Action
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                OutlinedTextField(
                                    value = aiPromptInput,
                                    onValueChange = { viewModel.setAiInput(it) },
                                    placeholder = { Text(Localization.getString("ai_prompt_hint", activeLang), fontSize = 12.sp, color = Color.White.copy(alpha = 0.5f)) },
                                    modifier = Modifier
                                        .weight(1f)
                                        .testTag("ai_input_field"),
                                    singleLine = false,
                                    maxLines = 4,
                                    shape = RoundedCornerShape(16.dp),
                                    colors = OutlinedTextFieldDefaults.colors(
                                        focusedBorderColor = Color(0xFF38BDF8),
                                        unfocusedBorderColor = Color.White.copy(alpha = 0.2f),
                                        focusedContainerColor = Color.White.copy(alpha = 0.1f),
                                        unfocusedContainerColor = Color.White.copy(alpha = 0.05f),
                                        focusedTextColor = Color.White,
                                        unfocusedTextColor = Color.White
                                    ),
                                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                                    keyboardActions = KeyboardActions(onDone = {
                                        keyboardController?.hide()
                                        viewModel.getCalgaryAiAdvice()
                                    })
                                )

                                Spacer(modifier = Modifier.width(8.dp))

                                Button(
                                    onClick = {
                                        keyboardController?.hide()
                                        viewModel.getCalgaryAiAdvice()
                                    },
                                    colors = ButtonDefaults.buttonColors(
                                        containerColor = Color(0xFFE11D48),
                                        contentColor = Color.White
                                    ),
                                    modifier = Modifier
                                        .height(54.dp)
                                        .testTag("ai_submit_button")
                                ) {
                                    if (loadingStatus) {
                                        CircularProgressIndicator(
                                            modifier = Modifier.size(20.dp),
                                            color = Color.White,
                                            strokeWidth = 2.dp
                                        )
                                    } else {
                                        Icon(Icons.Default.PlayArrow, contentDescription = "Compute AI")
                                    }
                                }
                            }

                            // Output Visual Presentation
                            Card(
                                shape = RoundedCornerShape(24.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = Color.White.copy(alpha = 0.05f)
                                ),
                                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .weight(1f)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .padding(16.dp)
                                ) {
                                    if (loadingStatus) {
                                        Column(
                                            modifier = Modifier.align(Alignment.Center),
                                            horizontalAlignment = Alignment.CenterHorizontally
                                        ) {
                                            CircularProgressIndicator(color = Color(0xFF38BDF8))
                                            Spacer(modifier = Modifier.height(10.dp))
                                            Text(text = "Calgary AI Advisor compiling solutions...", fontSize = 12.sp, color = Color.White.copy(alpha = 0.8f))
                                        }
                                    } else if (aiResponseOutput != null) {
                                        LazyColumn(modifier = Modifier.fillMaxSize()) {
                                            item {
                                                Column {
                                                    Row(
                                                        modifier = Modifier.fillMaxWidth(),
                                                        horizontalArrangement = Arrangement.SpaceBetween,
                                                        verticalAlignment = Alignment.CenterVertically
                                                    ) {
                                                        Text(
                                                            text = Localization.getString("ai_advisor_header", activeLang),
                                                            fontWeight = FontWeight.Bold,
                                                            fontSize = 15.sp,
                                                            color = Color(0xFF38BDF8)
                                                        )
                                                        IconButton(onClick = { viewModel.clearAiOutput() }) {
                                                            Icon(Icons.Default.Clear, contentDescription = "Clear result", tint = Color.White.copy(alpha = 0.6f))
                                                        }
                                                    }
                                                    Spacer(modifier = Modifier.height(8.dp))
                                                    Text(
                                                        text = aiResponseOutput!!,
                                                        fontSize = 14.sp,
                                                        lineHeight = 20.sp,
                                                        color = Color(0xFFF8FAFC)
                                                    )
                                                    Spacer(modifier = Modifier.height(16.dp))
                                                    Text(
                                                        text = "* Security Disclaimer: Always verify City bylaws directly by calling 311 or Calgary.ca before starting commercial actions.",
                                                        fontSize = 10.sp,
                                                        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
                                                    )
                                                }
                                            }
                                        }
                                    } else {
                                        Column(
                                            modifier = Modifier.align(Alignment.Center),
                                            horizontalAlignment = Alignment.CenterHorizontally
                                        ) {
                                            Icon(
                                                imageVector = Icons.Default.Info,
                                                contentDescription = "Tips Panel",
                                                tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.5f),
                                                modifier = Modifier.size(36.dp)
                                            )
                                            Spacer(modifier = Modifier.height(8.dp))
                                            Text(
                                                text = "Ready to create solutions in Calgary.\nType above or press a preset!",
                                                fontSize = 13.sp,
                                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                                textAlign = TextAlign.Center
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    "shortlist" -> {
                        // LOCAL PLANS & USER CUSTOM NOTE PERSISTENCE (ROOM DATABASE)
                        Column(modifier = Modifier.fillMaxSize()) {
                            Text(
                                text = Localization.getString("saved_notes_title", activeLang),
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                modifier = Modifier.padding(bottom = 8.dp)
                            )

                            if (userSavedShortlist.isEmpty()) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .padding(32.dp),
                                    verticalArrangement = Arrangement.Center,
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.FavoriteBorder,
                                        contentDescription = "No Saved Items",
                                        tint = Color.White.copy(alpha = 0.4f),
                                        modifier = Modifier.size(48.dp)
                                    )
                                    Spacer(modifier = Modifier.height(12.dp))
                                    Text(
                                        text = Localization.getString("no_bookmarks_yet", activeLang),
                                        fontSize = 13.sp,
                                        color = Color(0xFF94A3B8),
                                        textAlign = TextAlign.Center,
                                        lineHeight = 18.sp
                                    )
                                }
                            } else {
                                LazyColumn(
                                    verticalArrangement = Arrangement.spacedBy(12.dp),
                                    modifier = Modifier.fillMaxSize()
                                ) {
                                    items(userSavedShortlist) { bookmark ->
                                        Card(
                                            shape = RoundedCornerShape(16.dp),
                                            colors = CardDefaults.cardColors(
                                                containerColor = if (bookmark.isCompleted) {
                                                    Color.White.copy(alpha = 0.02f)
                                                } else {
                                                    Color.White.copy(alpha = 0.05f)
                                                }
                                            ),
                                            border = BorderStroke(1.dp, Color.White.copy(alpha = if (bookmark.isCompleted) 0.05f else 0.15f)),
                                            elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                                            modifier = Modifier.fillMaxWidth()
                                        ) {
                                            Column(modifier = Modifier.padding(14.dp)) {
                                                Row(
                                                    modifier = Modifier.fillMaxWidth(),
                                                    horizontalArrangement = Arrangement.SpaceBetween,
                                                    verticalAlignment = Alignment.CenterVertically
                                                ) {
                                                    Row(
                                                        verticalAlignment = Alignment.CenterVertically,
                                                        modifier = Modifier.weight(1f)
                                                    ) {
                                                        IconButton(
                                                            onClick = {
                                                                viewModel.toggleBookmarkCompletion(
                                                                    bookmark.id,
                                                                    bookmark.category,
                                                                    bookmark.title,
                                                                    !bookmark.isCompleted
                                                                )
                                                            }
                                                        ) {
                                                            Icon(
                                                                imageVector = if (bookmark.isCompleted) Icons.Default.CheckCircle else Icons.Default.Done,
                                                                contentDescription = "Complete task",
                                                                tint = if (bookmark.isCompleted) Color(0xFF10B981) else Color.White.copy(alpha = 0.5f)
                                                            )
                                                        }
                                                        Spacer(modifier = Modifier.width(4.dp))
                                                        Text(
                                                            text = bookmark.title,
                                                            fontSize = 15.sp,
                                                            fontWeight = FontWeight.Bold,
                                                            color = if (bookmark.isCompleted) {
                                                                Color.White.copy(alpha = 0.4f)
                                                            } else {
                                                                Color.White
                                                            }
                                                        )
                                                    }

                                                    IconButton(onClick = { viewModel.removeBookmark(bookmark.id) }) {
                                                        Icon(
                                                            imageVector = Icons.Default.Delete,
                                                            contentDescription = "Delete from plan",
                                                            tint = Color(0xFFE11D48)
                                                        )
                                                    }
                                                }

                                                Spacer(modifier = Modifier.height(4.dp))

                                                // Dynamic text-notes area, persistent in database
                                                OutlinedTextField(
                                                    value = localNotes[bookmark.id] ?: bookmark.note,
                                                    onValueChange = { newText ->
                                                        viewModel.updateBookmarkNote(
                                                            bookmark.id,
                                                            bookmark.category,
                                                            bookmark.title,
                                                            newText
                                                        )
                                                    },
                                                    label = { Text(Localization.getString("add_note_placeholder", activeLang), fontSize = 11.sp, color = Color.White.copy(alpha = 0.5f)) },
                                                    modifier = Modifier
                                                        .fillMaxWidth()
                                                        .padding(horizontal = 4.dp),
                                                    textStyle = androidx.compose.ui.text.TextStyle(color = Color.White, fontSize = 13.sp),
                                                    singleLine = false,
                                                    maxLines = 2,
                                                    colors = OutlinedTextFieldDefaults.colors(
                                                        focusedBorderColor = Color(0xFF38BDF8),
                                                        unfocusedBorderColor = Color.White.copy(alpha = 0.2f),
                                                        focusedContainerColor = Color.Transparent,
                                                        unfocusedContainerColor = Color.Transparent
                                                    )
                                                )
                                                
                                                Row(
                                                    modifier = Modifier.fillMaxWidth().padding(top = 4.dp, end = 6.dp),
                                                    horizontalArrangement = Arrangement.End
                                                ) {
                                                    Text(
                                                        text = if (isSavingNotes) Localization.getString("saving_notes", activeLang) else "",
                                                        fontSize = 10.sp,
                                                        color = Color(0xFF94A3B8)
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
}
}
}
}

