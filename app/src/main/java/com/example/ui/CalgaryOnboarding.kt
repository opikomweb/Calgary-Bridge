package com.example

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Localization
import kotlinx.coroutines.delay

// Reusable micro-interaction scale modifier
fun Modifier.bounceClickable(onClick: () -> Unit) = composed {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.97f else 1f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessMedium
        ),
        label = "bounce"
    )
    this.graphicsLayer {
        scaleX = scale
        scaleY = scale
    }.clickable(
        interactionSource = interactionSource,
        indication = androidx.compose.foundation.LocalIndication.current,
        onClick = onClick
    )
}

@Composable
fun CalgaryOnboarding(
    activeLang: String,
    onOnboardingComplete: (role: String, needs: Set<String>) -> Unit
) {
    var step by remember { mutableStateOf(1) } // 1: Welcome, 2: Identity, 3: Priorities, 4: Value Reveal, 5: Core Activated
    var selectedRole by remember { mutableStateOf("") }
    val selectedNeeds = remember { mutableStateListOf<String>() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF0F172A),
                        Color(0xFF0B1021)
                    )
                )
            )
    ) {
        // High quality blurry organic gradient background circles
        androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(Color(0xFFE11D48).copy(alpha = 0.15f), Color.Transparent),
                    center = androidx.compose.ui.geometry.Offset(0f, 0f),
                    radius = size.width * 0.8f
                ),
                radius = size.width * 0.8f,
                center = androidx.compose.ui.geometry.Offset(0f, 0f)
            )
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(Color(0xFF0284C7).copy(alpha = 0.2f), Color.Transparent),
                    center = androidx.compose.ui.geometry.Offset(size.width, size.height),
                    radius = size.width * 0.9f
                ),
                radius = size.width * 0.9f,
                center = androidx.compose.ui.geometry.Offset(size.width, size.height)
            )
        }

        AnimatedContent(
            targetState = step,
            transitionSpec = {
                slideInHorizontally(initialOffsetX = { it }) + fadeIn() togetherWith
                        slideOutHorizontally(targetOffsetX = { -it }) + fadeOut()
            },
            label = "onboarding_steps",
            modifier = Modifier.fillMaxSize()
        ) { currentStep ->
            when (currentStep) {
                1 -> WelcomeStep(activeLang) { step = 2 }
                2 -> IdentityStep(
                    activeLang = activeLang,
                    selectedRole = selectedRole,
                    onRoleSelected = { 
                        selectedRole = it
                        step = 3
                    }
                )
                3 -> PrioritiesStep(
                    activeLang = activeLang,
                    selectedNeeds = selectedNeeds,
                    onToggleNeed = { need ->
                        if (selectedNeeds.contains(need)) {
                            selectedNeeds.remove(need)
                        } else if (selectedNeeds.size < 3) {
                            selectedNeeds.add(need)
                        }
                    },
                    onContinue = { step = 4 }
                )
                4 -> ValueRevealStep(
                    activeLang = activeLang,
                    role = selectedRole,
                    needs = selectedNeeds.toSet(),
                    onContinue = { step = 5 }
                )
                5 -> AIActivationStep(
                    activeLang = activeLang,
                    onExplore = { onOnboardingComplete(selectedRole, selectedNeeds.toSet()) }
                )
            }
        }
    }
}

// STEP 1 DETAILED SCREEN
@Composable
fun WelcomeStep(activeLang: String, onStart: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(28.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Modern Glassmorphic Logo
        Box(
            modifier = Modifier
                .size(120.dp)
                .background(
                    Brush.linearGradient(
                        colors = listOf(
                            Color.White.copy(alpha = 0.1f),
                            Color.White.copy(alpha = 0.02f)
                        )
                    ),
                    CircleShape
                )
                .border(1.dp, Color.White.copy(alpha = 0.2f), CircleShape)
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.radialGradient(
                            colors = listOf(Color(0xFFE11D48).copy(alpha = 0.4f), Color.Transparent)
                        ),
                        CircleShape
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text("🏔️", fontSize = 56.sp)
            }
        }

        Spacer(modifier = Modifier.height(40.dp))

        Text(
            text = "Calgary Bridge.",
            fontSize = 42.sp,
            fontWeight = FontWeight.Black,
            color = Color.White,
            textAlign = TextAlign.Center,
            letterSpacing = (-1).sp,
            lineHeight = 44.sp
        )
        
        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Your digital environment for finding help, protecting rights, and navigating Calgary safely.",
            fontSize = 16.sp,
            color = Color(0xFFE2E8F0),
            textAlign = TextAlign.Center,
            lineHeight = 24.sp,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Spacer(modifier = Modifier.height(48.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .bounceClickable(onStart)
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFFF43F5E), Color(0xFFE11D48))
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .border(
                    width = 1.dp,
                    color = Color.White.copy(alpha = 0.4f),
                    shape = RoundedCornerShape(16.dp)
                )
                .clip(RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Start in 30 seconds",
                    fontSize = 18.sp,
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.width(8.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    tint = Color.White
                )
            }
        }
    }
}

// STEP 2 DETAILED SCREEN
@Composable
fun IdentityStep(
    activeLang: String,
    selectedRole: String,
    onRoleSelected: (String) -> Unit
) {
    val roles = listOf(
        RoleItem("newcomer", "New to Calgary 🧳", "Arrived recently, need residency, housing support, & community guides."),
        RoleItem("student", "Student 🎓", "Post-secondary at UCalgary, SAIT, MRU. Affordable rents & transit options."),
        RoleItem("professional", "Working Class 💼", "Tenant guides, employment rights tools, local commute and weather updates."),
        RoleItem("family", "Family 👨‍👩‍👧", "Food resources, schooling lookup, parks, childcare subsidies & social programs."),
        RoleItem("senior", "Senior 👵", "Pensions aid, dedicated healthcare routes, physical navigation, and accessibility."),
        RoleItem("business", "Business Owner 🏪", "Promotional tools, local marketplace tools, regulatory alerts & networking."),
        RoleItem("emergency", "Need Immediate Help 🚨", "Urgent heating/food failure, shelters locator, direct mental crisis lines.")
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
    ) {
        Spacer(modifier = Modifier.height(28.dp))
        
        Text(
            text = "Tell us about you",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
        
        Text(
            text = "Choose the option that aligns best with your profile for automated super-app customization.",
            fontSize = 14.sp,
            color = Color(0xFF94A3B8),
            modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
        )

        LazyVerticalGrid(
            columns = GridCells.Fixed(1),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.weight(1f)
        ) {
            items(roles) { role ->
                val isSelected = selectedRole == role.key
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = if (isSelected) Color(0xFF1E293B) else Color(0xFF1E293B).copy(alpha = 0.5f),
                    border = BorderStroke(
                        width = if (isSelected) 2.dp else 1.dp,
                        color = if (isSelected) Color(0xFFF43F5E) else Color.White.copy(alpha = 0.1f)
                    ),
                    modifier = Modifier
                        .fillMaxWidth()
                        .bounceClickable { onRoleSelected(role.key) }
                        .testTag("role_card_${role.key}")
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = role.title,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isSelected) Color(0xFFF43F5E) else Color.White
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = role.description,
                                fontSize = 12.sp,
                                color = Color(0xFF94A3B8),
                                lineHeight = 16.sp
                            )
                        }
                    }
                }
            }
        }
    }
}

data class RoleItem(val key: String, val title: String, val description: String)

// STEP 3 DETAILED SCREEN
@Composable
fun PrioritiesStep(
    activeLang: String,
    selectedNeeds: List<String>,
    onToggleNeed: (String) -> Unit,
    onContinue: () -> Unit
) {
    val needs = listOf(
        NeedItem("housing", "Housing & Rent 🏠", "Lease advisor, rent relief systems & eviction shield protection."),
        NeedItem("jobs", "Jobs & Income 💰", "Small business listings, provincial grants tracker, legal rights."),
        NeedItem("food", "Food Support 🍞", "Free mobile shelters, low income food baskets & NGO pantries."),
        NeedItem("healthcare", "Healthcare 🏥", "Locate clinics, access urgent care clinics & medical wait times."),
        NeedItem("mental", "Mental Health 🧠", "Confidential helplines, peer therapy programs & social NGOs."),
        NeedItem("transit", "Transportation 🚗", "Transit passes subventions, real-time alerts & winter parking rules."),
        NeedItem("legal", "Legal Help ⚖️", "Alberta tenancy arbitration, human rights support & notary templates."),
        NeedItem("deals", "Deals & Discounts 🛍", "Exclusive municipal vouchers, SME deals helper, support stores.")
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
    ) {
        Spacer(modifier = Modifier.height(28.dp))

        Text(
            text = "Select priority needs",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        Text(
            text = "Pick up to 3 fields. Your Calgary Bridge dashboard will automatically prioritize and pin these.",
            fontSize = 14.sp,
            color = Color(0xFF94A3B8),
            modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
        )

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.weight(1f)
        ) {
            items(needs) { item ->
                val isSelected = selectedNeeds.contains(item.key)
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = if (isSelected) Color(0xFF1E293B) else Color(0xFF131D31),
                    border = BorderStroke(
                        width = if (isSelected) 2.dp else 1.dp,
                        color = if (isSelected) Color(0xFF0EA5E9) else Color.White.copy(alpha = 0.08f)
                    ),
                    modifier = Modifier
                        .height(110.dp)
                        .bounceClickable { onToggleNeed(item.key) }
                        .testTag("need_card_${item.key}")
                ) {
                    Column(
                        modifier = Modifier.padding(12.dp),
                        verticalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = item.title,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = "Choose",
                                fontSize = 10.sp,
                                color = if (isSelected) Color(0xFF0EA5E9) else Color(0xFF94A3B8).copy(alpha = 0.5f)
                            )
                            if (isSelected) {
                                Box(
                                    modifier = Modifier
                                        .size(18.dp)
                                        .background(Color(0xFF0EA5E9), CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = null,
                                        tint = Color.White,
                                        modifier = Modifier.size(12.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .bounceClickable {
                    if (selectedNeeds.isNotEmpty()) onContinue()
                }
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFF0EA5E9).copy(alpha = if (selectedNeeds.isNotEmpty()) 0.8f else 0.4f), Color(0xFF0284C7).copy(alpha = if (selectedNeeds.isNotEmpty()) 0.8f else 0.4f))
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .border(
                    width = 1.dp,
                    color = Color.White.copy(alpha = if (selectedNeeds.isNotEmpty()) 0.4f else 0.1f),
                    shape = RoundedCornerShape(16.dp)
                )
                .clip(RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Continue (${selectedNeeds.size}/3 selected)",
                fontSize = 18.sp,
                color = if (selectedNeeds.isNotEmpty()) Color.White else Color.White.copy(alpha = 0.5f),
                fontWeight = FontWeight.Bold
            )
        }
    }
}

data class NeedItem(val key: String, val title: String, val description: String)

// STEP 4 SHOW CARD ANIMATIONS (VIRAL MOMENT)
@Composable
fun ValueRevealStep(
    activeLang: String,
    role: String,
    needs: Set<String>,
    onContinue: () -> Unit
) {
    val revealDetails = remember {
        listOf(
            "🏠 Rent Protection activated (Source: Residential Tenancies Act Alberta).",
            "🎟️ Low-Income bus passes & fare estimators matched (Source: Calgary Transit).",
            "🍎 Fast routing for NGOs & food hampers (Source: Calgary Food Bank & Mustard Seed).",
            "🏪 Small business promo toolkits registered (Source: Calgary Chamber of Commerce).",
            "🤖 Multi-Agent AI Advisor synced to latest local municipal & provincial data."
        )
    }

    var visibleCount by remember { mutableStateOf(0) }

    LaunchedEffect(Unit) {
        for (i in 1..revealDetails.size) {
            delay(500)
            visibleCount = i
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Match Analysis Complete",
            fontSize = 26.sp,
            fontWeight = FontWeight.Black,
            color = Color(0xFF38BDF8)
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Your digital environment is securely provisioned with trusted municipal sources directly from Calgary agencies and provincial APIs.",
            fontSize = 14.sp,
            color = Color(0xFFE2E8F0),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        Spacer(modifier = Modifier.height(28.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            revealDetails.forEachIndexed { index, text ->
                AnimatedVisibility(
                    visible = index < visibleCount,
                    enter = slideInVertically(initialOffsetY = { 20 }) + fadeIn(),
                    exit = fadeOut()
                ) {
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color(0xFF1E293B).copy(alpha = 0.5f),
                        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .graphicsLayer {
                                translationY = 0f
                            }
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(32.dp)
                                    .background(
                                        Brush.linearGradient(
                                            colors = listOf(Color(0xFF38BDF8), Color(0xFF0284C7))
                                        ), CircleShape
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Star,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = text,
                                fontSize = 13.sp,
                                color = Color(0xFFF8FAFC),
                                fontWeight = FontWeight.Medium,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .bounceClickable {
                    if (visibleCount >= revealDetails.size) onContinue()
                }
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFF10B981).copy(alpha = if (visibleCount >= revealDetails.size) 0.8f else 0.4f), Color(0xFF059669).copy(alpha = if (visibleCount >= revealDetails.size) 0.8f else 0.4f))
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .border(
                    width = 1.dp,
                    color = Color.White.copy(alpha = if (visibleCount >= revealDetails.size) 0.4f else 0.1f),
                    shape = RoundedCornerShape(16.dp)
                )
                .clip(RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Activate My Account",
                fontSize = 18.sp,
                color = if (visibleCount >= revealDetails.size) Color.White else Color.White.copy(alpha = 0.5f),
                fontWeight = FontWeight.Bold
            )
        }
    }
}

// STEP 5 ACTIVATED SCREEN
@Composable
fun AIActivationStep(
    activeLang: String,
    onExplore: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(28.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(120.dp)
                .background(Color(0xFF10B981).copy(alpha = 0.08f), CircleShape)
                .border(2.dp, Color(0xFF10B981).copy(alpha = 0.3f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text("⚡", fontSize = 52.sp)
        }

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "Calgary Bridge AI Active",
            fontSize = 28.sp,
            fontWeight = FontWeight.Black,
            color = Color.White,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Your civic intelligence super-app is up, configured, and synchronized. Explore local business offers, protect your tenancy, find resources, or ask anything to Calgary's first unified digital guide.",
            fontSize = 14.sp,
            color = Color(0xFF94A3B8),
            textAlign = TextAlign.Center,
            lineHeight = 22.sp,
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        Spacer(modifier = Modifier.height(48.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .bounceClickable(onExplore)
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFFF43F5E), Color(0xFFBE123C))
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .border(
                    width = 1.dp,
                    color = Color.White.copy(alpha = 0.4f),
                    shape = RoundedCornerShape(16.dp)
                )
                .clip(RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Enter Calgary Bridge",
                fontSize = 18.sp,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
