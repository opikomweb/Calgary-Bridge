package com.example

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Localization
import com.example.ui.CalgaryViewModel

@Composable
fun EmergencyDashboard(
    activeLang: String,
    viewModel: CalgaryViewModel,
    onExit: () -> Unit
) {
    val context = LocalContext.current
    var activeEmergencyTopicAdvice by remember { mutableStateOf("") }
    var activeEmergencyTopicTitle by remember { mutableStateOf("") }

    // Pulse animation for critical background accents
    val infiniteTransition = rememberInfiniteTransition(label = "emergency_pulse")
    val pulseAlpha by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 0.8f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = EaseInOutCubic),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF270F0F), // Rich dark crimson
                        Color(0xFF0F0707)  // Deepest velvet charcoal
                    )
                )
            )
            .padding(20.dp)
            .statusBarsPadding()
            .navigationBarsPadding(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Red Pulsing Heartbeat Status Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(Color(0xFF7F1D1D).copy(alpha = pulseAlpha))
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = Icons.Default.Warning,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "EMERGENCY & WINTER DISPATCH CO-HOST",
                fontSize = 12.sp,
                fontWeight = FontWeight.Black,
                letterSpacing = 1.sp,
                color = Color.White
            )
        }

        Spacer(modifier = Modifier.height(18.dp))

        // Headline
        Text(
            text = "Calgary Priority Safety Hub",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            textAlign = TextAlign.Center
        )
        Text(
            text = "Instant civil safety line connection and immediate automated survival instructions.",
            fontSize = 13.sp,
            color = Color(0xFFFCA5A5),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 4.dp, bottom = 12.dp)
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Direct dial helpline triggers - 1-2 click accessibility
        Text(
            text = "LAUNCH CRITICAL SERVICES DIALER",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.sp,
            color = Color(0xFFEF4444),
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )
        Spacer(modifier = Modifier.height(8.dp))

        Column(
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            HelplineButton(
                number = "211",
                serviceName = "Calgary 211 - Community Support & Shelters",
                description = "Call for rental crises, warm clothes deposits, food hampers, and mental welfare counselors.",
                color = Color(0xFFDC2626),
                context = context
            )
            HelplineButton(
                number = "311",
                serviceName = "Calgary 311 - Water, Heating & City Safety",
                description = "Report main water breaks, municipal heating failures, roadway blackice/extreme hazards.",
                color = Color(0xFFD97706),
                context = context
            )
            HelplineButton(
                number = "911",
                serviceName = "Calgary 911 - Police / Fire / Ambulance",
                description = "Only for active life-threatening emergencies, fire breakouts, extreme medical incidents.",
                color = Color(0xFF991B1B),
                context = context
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Calgary Survival Instruction Cards
        Text(
            text = "IMMEDIATE WINTER & HAZARD INSTRUCTIONS",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.sp,
            color = Color(0xFFFCA5A5),
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )
        Spacer(modifier = Modifier.height(8.dp))

        val safetyTips = listOf(
            SafetyTopic(
                "Winter Shelters & Heat Centers",
                "During deep freezes (-20C or below), Calgary operates multiple 24/7 dry centers (The Mustard Seed, Drop-In Centre, Salvation Army). Under Calgary warming protocol, transit vehicles can serve as emergency staging. If you are freezing, find immediate transit hubs."
            ),
            SafetyTopic(
                "No Furnace/Heating in Apartment",
                "Under the Alberta Public Health Act, landlords MUST maintain home temperatures at 20°C minimum. If heating fails in winter, report to 311 immediately to dispatch health inspectors. Send a written request text: 'Heating failed. Urgent requirement under Alberta Minimum Housing Standards'."
            ),
            SafetyTopic(
                "Wildfire Smoke Protocols",
                "Calgary air indices frequently dip due to mountain smokeflows. When AQHI levels are 7+, limit strenuous outdoor activities. Set home HVAC ventilation recirculate. Find clean air centers at public libraries (Calgary Public Library Central, Crowfoot, etc.)."
            ),
            SafetyTopic(
                "Sudden Water Outages",
                "Verify with Calgary 311 if water pipes are frozen or blocked. Run a tiny drip to prevent solid pipe freezes in extreme sub-30 conditions. If plumbing bursts, turn off main shutoff valve (usually found in the basement near the mechanical feed pipe)."
            )
        )

        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(safetyTips) { tip ->
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = if (activeEmergencyTopicTitle == tip.title) Color(0xFF451A1A) else Color(0xFF1F0E0E),
                    border = BorderStroke(1.dp, Color(0xFF7F1D1D)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            if (activeEmergencyTopicTitle == tip.title) {
                                activeEmergencyTopicTitle = ""
                                activeEmergencyTopicAdvice = ""
                            } else {
                                activeEmergencyTopicTitle = tip.title
                                activeEmergencyTopicAdvice = tip.content
                            }
                        }
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = tip.title,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                contentDescription = null,
                                tint = Color(0xFFFCA5A5)
                            )
                        }
                        AnimatedVisibility(visible = activeEmergencyTopicTitle == tip.title) {
                            Text(
                                text = tip.content,
                                fontSize = 12.sp,
                                color = Color(0xFFFEE2E2),
                                modifier = Modifier.padding(top = 8.dp),
                                lineHeight = 16.sp
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Return to Standard Calgary Bridge App
        Button(
            onClick = onExit,
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.White.copy(alpha = 0.15f),
                contentColor = Color.White
            ),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .testTag("exit_emergency_button")
        ) {
            Text(
                text = "Exit Emergency Mode & Return to Calgary Bridge",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun HelplineButton(
    number: String,
    serviceName: String,
    description: String,
    color: Color,
    context: Context
) {
    Surface(
        shape = RoundedCornerShape(14.dp),
        color = Color(0xFF1E1111),
        border = BorderStroke(1.dp, color.copy(alpha = 0.5f)),
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                try {
                    val intent = Intent(Intent.ACTION_DIAL).apply {
                        data = Uri.parse("tel:$number")
                    }
                    context.startActivity(intent)
                } catch (e: Exception) {
                    Toast
                        .makeText(context, "Dialer unavailable. Dial $number manually.", Toast.LENGTH_LONG)
                        .show()
                }
            }
            .testTag("hotline_call_$number")
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .background(color, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Phone,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(18.dp)
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = serviceName,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(
                    text = description,
                    fontSize = 11.sp,
                    color = Color(0xFFFCA5A5),
                    lineHeight = 14.sp,
                    modifier = Modifier.padding(top = 2.dp)
                )
            }
        }
    }
}

data class SafetyTopic(val title: String, val content: String)
