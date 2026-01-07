/**
 * PDF Font utilities - simple transliteration for Polish characters
 */

/**
 * Transliterate Polish and special characters to ASCII equivalents
 */
export function transliteratePolish(text) {
  if (!text) return text

  // Polish characters map
  const polishMap = {
    '\u0105': 'a', '\u0104': 'A', // ą Ą
    '\u0107': 'c', '\u0106': 'C', // ć Ć
    '\u0119': 'e', '\u0118': 'E', // ę Ę
    '\u0142': 'l', '\u0141': 'L', // ł Ł
    '\u0144': 'n', '\u0143': 'N', // ń Ń
    '\u00f3': 'o', '\u00d3': 'O', // ó Ó
    '\u015b': 's', '\u015a': 'S', // ś Ś
    '\u017a': 'z', '\u0179': 'Z', // ź Ź
    '\u017c': 'z', '\u017b': 'Z', // ż Ż
  }

  // Special characters map
  const specialMap = {
    '\u2192': ' -> ',  // →
    '\u2190': ' <- ',  // ←
    '\u2194': ' <-> ', // ↔
    '\u21d2': ' => ',  // ⇒
    '\u2022': '-',     // •
    '\u2013': '-',     // –
    '\u2014': '-',     // —
    '\u201c': '"',     // "
    '\u201d': '"',     // "
    '\u2018': "'",     // '
    '\u2019': "'",     // '
    '\u2026': '...',   // …
  }

  let result = text

  // Replace Polish characters
  for (const [char, replacement] of Object.entries(polishMap)) {
    result = result.split(char).join(replacement)
  }

  // Replace special characters
  for (const [char, replacement] of Object.entries(specialMap)) {
    result = result.split(char).join(replacement)
  }

  return result
}
