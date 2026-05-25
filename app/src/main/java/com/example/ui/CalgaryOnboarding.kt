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
import androidx.compose.ui.draw.blur
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
            .background(Color(0xFF0F172A)) // Dark slate background for cinematic contrast
    ) {
        // Blurred organic gradient background circles
        val infiniteTransition = rememberInfiniteTransition(label = "pulse_bg")
        val circleShift1 by infiniteTransition.animateFloat(
            initialValue = -50f,
            targetValue = 50f,
            animationSpec = infiniteRepeatable(tween(8000, easing = EaseInOutSine), RepeatMode.Reverse),
            label = "blur_1"
        )
        val circleShift2 by infiniteTransition.animateFloat(
            initialValue = 50f,
            targetValue = -50f,
            animationSpec = infiniteRepeatable(tween(10000, easing = EaseInOutSine), RepeatMode.Reverse),
            label = "blur_2"
        )

        // Light glows behind content
        Box(
            modifier = Modifier
                .offset(x = (-100).dp + circleShift1.dp, y = (-100).dp)
                .size(350.dp)
                .background(Color(0xFFE11D48).copy(alpha = 0.15f), CircleShape)
                .blur(80.dp)
        )
        Box(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .offset(x = 100.dp + circleShift2.dp, y = 100.dp)
                .size(400.dp)
                .background(Color(0xFF0284C7).copy(alpha = 0.2f), CircleShape)
                .blur(100.dp)
        )

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
        // Logo Arc
        Box(
            modifier = Modifier
                .size(100.dp)
                .background(Color.White.copy(alpha = 0.05f), CircleShape)
                .border(1.dp, Color.White.copy(alpha = 0.15f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text("🏔️", fontSize = 42.sp)
        }

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "Welcome to \nCalgary Bridge",
            fontSize = 32.sp,
            fontWeight = FontWeight.Black,
            color = Color.White,
            textAlign = TextAlign.Center,
            lineHeight = 38.sp
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Everything you need to live, find help, protect your rights, and navigate Calgary - built seamlessly in one single super-app.",
            fontSize = 15.sp,
            color = Color(0xFF94A3B8),
            textAlign = TextAlign.Center,
            lineHeight = 22.sp,
            modifier = Modifier.padding(horizontal = 12.dp)
        )

        Spacer(modifier = Modifier.height(48.dp))

        Button(
            onClick = onStart,
            modifier = Modifier
                .fillMaxWidth()
                .bounceClickable(onStart)
                .height(56.dp)
                .testTag("onboarding_start_button"),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFF43F5E), // Wildrose Crimson
                contentColor = Color.White
            ),
            shape = RoundedCornerShape(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Start in 30 seconds",
                    fontSize = 16.sp,
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

        Button(
            onClick = onContinue,
            enabled = selectedNeeds.isNotEmpty(),
            modifier = Modifier
                .fillMaxWidth()
                .bounceClickable(onContinue)
                .height(56.dp)
                .testTag("onboarding_needs_continue"),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF0EA5E9),
                contentColor = Color.White,
                disabledContainerColor = Color(0xFF1E293B)
            ),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text(
                text = "Continue (${selectedNeeds.size}/3 selected)",
                fontSize = 16.sp,
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
            "🏠 Calgary Rent Protection Schemes & Tenant Shield system activated.",
            "🎟️ Low-Income bus passes & City Concession fare estimators matched.",
            "🍎 Fast routing for NGOs, food hampers, and mobile warmth depots.",
            "🏪 Micro-coupons and free small business promo toolkits registered.",
            "🤖 Contextual Multi-Agent AI Advisor synced for Albertan legislation."
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
            fontSize = 24.sp,
            fontWeight = FontWeight.Black,
            color = Color(0xFF38BDF8)
        )
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = "We configured your super-app and pre-loaded immediate municipal resources you may already qualify for in Calgary:",
            fontSize = 13.sp,
            color = Color(0xFF94A3B8),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 12.dp)
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
                        color = Color(0xFF131D31),
                        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.05f)),
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
                                    .background(Color(0xFF38BDF8).copy(alpha = 0.1f), CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Star,
                                    contentDescription = null,
                                    tint = Color(0xFF38BDF8),
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = text,
                                fontSize = 13.sp,
                                color = Color.White,
                                fontWeight = FontWeight.Medium,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = onContinue,
            enabled = visibleCount >= revealDetails.size,
            modifier = Modifier
                .fillMaxWidth()
                .bounceClickable(onContinue)
                .height(56.dp)
                .testTag("onboarding_value_continue"),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF10B981), // Green for success
                contentColor = Color.White
            ),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text(
                text = "Activate My Account",
                fontSize = 16.sp,
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

        Button(
            onClick = onExplore,
            modifier = Modifier
                .fillMaxWidth()
                .bounceClickable(onExplore)
                .height(56.dp)
                .testTag("onboarding_activation_primary"),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFF43F5E),
                contentColor = Color.White
            ),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text(
                text = "Enter Calgary Bridge",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
