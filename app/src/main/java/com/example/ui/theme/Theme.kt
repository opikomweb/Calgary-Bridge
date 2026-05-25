package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme =
  darkColorScheme(
    primary = LighterSage,
    secondary = SandHighlight,
    tertiary = ClayRed,
    background = DarkBg,
    surface = DarkSurface,
    onPrimary = DarkBg,
    onSecondary = Color.White,
    onBackground = Color(0xFFE2E3DE),
    onSurface = Color(0xFFE2E3DE),
    surfaceVariant = DarkSurfaceVariant,
    onSurfaceVariant = Color(0xFFB1B5B1),
    outline = DarkSurfaceVariant
  )

private val LightColorScheme =
  lightColorScheme(
    primary = ForestGreen,
    secondary = WarmSand,
    tertiary = ClayRed,
    background = NaturalBg,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = DarkText,
    onBackground = DarkText,
    onSurface = DarkText,
    surfaceVariant = SoftBeige,
    onSurfaceVariant = MutedText,
    outline = SoftDivider
  )

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  // Set to false by default to show our custom Natural Tones design theme
  dynamicColor: Boolean = false,
  content: @Composable () -> Unit,
) {
  val colorScheme =
    when {
      dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
        val context = LocalContext.current
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
      }

      darkTheme -> DarkColorScheme
      else -> LightColorScheme
    }

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
