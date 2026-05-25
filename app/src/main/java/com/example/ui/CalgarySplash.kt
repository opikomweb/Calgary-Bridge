package com.example

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.PathMeasure
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

@Composable
fun CalgarySplash(onSplashComplete: () -> Unit) {
    var startAnim by remember { mutableStateOf(false) }
    
    // Scale and alpha animation for typography & logo glow
    val animatedProgress = animateFloatAsState(
        targetValue = if (startAnim) 1f else 0f,
        animationSpec = tween(durationMillis = 2000, easing = FastOutSlowInEasing),
        label = "splash_glow"
    )

    // Drawing progress for the Bridge Arc / logo forming line
    val pathAnimProgress = animateFloatAsState(
        targetValue = if (startAnim) 1f else 0f,
        animationSpec = tween(durationMillis = 1800, easing = CubicBezierEasing(0.25f, 1f, 0.5f, 1f)),
        label = "bridge_path"
    )

    LaunchedEffect(Unit) {
        startAnim = true
        delay(3000)
        onSplashComplete()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF0F172A), // Very rich slate dark blue
                        Color(0xFF1E293B)  // Soft charcoal slate gradient
                    )
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        // Subtle background backdrop (Mountains & Bow River)
        Canvas(modifier = Modifier.fillMaxSize()) {
            val width = size.width
            val height = size.height

            // 1. Rocky Mountain horizon lines (Subtle semi-transparent slate shapes)
            val mountainPath = Path().apply {
                moveTo(0f, height * 0.45f)
                lineTo(width * 0.2f, height * 0.38f)
                lineTo(width * 0.35f, height * 0.42f)
                lineTo(width * 0.55f, height * 0.32f)
                lineTo(width * 0.75f, height * 0.4f)
                lineTo(width, height * 0.34f)
                lineTo(width, height)
                lineTo(0f, height)
                close()
            }
            drawPath(
                path = mountainPath,
                color = Color(0xFF334155).copy(alpha = 0.15f * animatedProgress.value)
            )

            // 2. Bow River motion curves (Sleek elegant glowing ribbon flowing from background)
            val riverPath = Path().apply {
                moveTo(width * 0.1f, height)
                cubicTo(
                    width * 0.2f, height * 0.8f,
                    width * 0.8f, height * 0.85f,
                    width * 0.5f, height * 0.6f
                )
                cubicTo(
                    width * 0.3f, height * 0.4f,
                    width * 0.7f, height * 0.45f,
                    width * 0.9f, height * 0.32f
                )
            }
            drawPath(
                path = riverPath,
                brush = Brush.linearGradient(
                    colors = listOf(
                        Color(0xFF38BDF8).copy(alpha = 0f),
                        Color(0xFF0EA5E9).copy(alpha = 0.25f),
                        Color(0xFF38BDF8).copy(alpha = 0.05f)
                    )
                ),
                style = Stroke(width = 6.dp.toPx(), cap = StrokeCap.Round)
            )
        }

        // Center logo & Text content
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(24.dp)
        ) {
            // Forming Bridge Arc/Logo
            Box(
                modifier = Modifier
                    .size(160.dp)
                    .graphicsLayer(
                        scaleX = 0.9f + (animatedProgress.value * 0.1f),
                        scaleY = 0.9f + (animatedProgress.value * 0.1f),
                        alpha = animatedProgress.value
                    ),
                contentAlignment = Alignment.Center
            ) {
                // The glowing bridge pulse
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val w = size.width
                    val h = size.height
                    
                    // Main Bridge Arc drawing
                    val bridgeArc = Path().apply {
                        moveTo(w * 0.15f, h * 0.65f)
                        // Dynamic cubic bezier arch
                        cubicTo(
                            w * 0.25f, h * 0.15f,
                            w * 0.75f, h * 0.15f,
                            w * 0.85f, h * 0.65f
                        )
                    }

                    // Lower Support/Deck of the Bridge
                    val bridgeDeck = Path().apply {
                        moveTo(w * 0.1f, h * 0.55f)
                        lineTo(w * 0.9f, h * 0.55f)
                    }

                    // Vertical suspender cables supporting deck
                    val cables = listOf(0.3f, 0.4f, 0.5f, 0.6f, 0.7f)

                    // Draw the deck and arch with path anim modifier
                    val pmArc = PathMeasure()
                    pmArc.setPath(bridgeArc, false)
                    val arcLen = pmArc.length
                    val activeArcPath = Path()
                    pmArc.getSegment(0f, arcLen * pathAnimProgress.value, activeArcPath, true)

                    val pmDeck = PathMeasure()
                    pmDeck.setPath(bridgeDeck, false)
                    val deckLen = pmDeck.length
                    val activeDeckPath = Path()
                    pmDeck.getSegment(0f, deckLen * pathAnimProgress.value, activeDeckPath, true)

                    // Draw arch
                    drawPath(
                        path = activeArcPath,
                        color = Color(0xFFF43F5E), // Calgary rich wild rose red
                        style = Stroke(width = 6.dp.toPx(), cap = StrokeCap.Round)
                    )

                    // Draw deck
                    drawPath(
                        path = activeDeckPath,
                        color = Color(0xFF38BDF8), // Bow River Blue accent
                        style = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round)
                    )

                    // Draw supporting cable lines
                    if (pathAnimProgress.value > 0.5f) {
                        val cableAlpha = ((pathAnimProgress.value - 0.5f) * 2f).coerceIn(0f, 1f)
                        cables.forEach { offset ->
                            val startX = w * offset
                            val startY = h * 0.55f
                            // Draw cable suspenders
                            drawLine(
                                color = Color.White.copy(alpha = 0.25f * cableAlpha),
                                start = androidx.compose.ui.geometry.Offset(startX, startY),
                                end = androidx.compose.ui.geometry.Offset(startX, h * 0.55f - (h * 0.2f * (0.5f - Math.abs(0.5f - offset)).toFloat() * 2f)),
                                strokeWidth = 1.5.dp.toPx()
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Text Typography
            Text(
                text = "CALGARY BRIDGE",
                fontSize = 28.sp,
                fontWeight = FontWeight.Black,
                letterSpacing = 2.sp,
                color = Color.White,
                modifier = Modifier
                    .alpha(animatedProgress.value)
                    .graphicsLayer(scaleX = 0.95f + 0.05f * animatedProgress.value)
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "Your City. Connected.",
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                letterSpacing = 0.5.sp,
                color = Color(0xFF94A3B8), // Muted slate text
                modifier = Modifier.alpha(animatedProgress.value * 0.8f)
            )
        }
    }
}
