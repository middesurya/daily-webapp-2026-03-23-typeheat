// QWERTY keyboard layout definition
// Each key: { key, label, code, width, finger }
// finger: 0-3 = left pinky to index, 4-7 = right index to pinky, 8 = thumbs

export const QWERTY_ROWS = [
  [
    { key: '`', label: '`', code: 'Backquote', width: 1, finger: 0 },
    { key: '1', label: '1', code: 'Digit1', width: 1, finger: 0 },
    { key: '2', label: '2', code: 'Digit2', width: 1, finger: 1 },
    { key: '3', label: '3', code: 'Digit3', width: 1, finger: 2 },
    { key: '4', label: '4', code: 'Digit4', width: 1, finger: 3 },
    { key: '5', label: '5', code: 'Digit5', width: 1, finger: 3 },
    { key: '6', label: '6', code: 'Digit6', width: 1, finger: 4 },
    { key: '7', label: '7', code: 'Digit7', width: 1, finger: 4 },
    { key: '8', label: '8', code: 'Digit8', width: 1, finger: 5 },
    { key: '9', label: '9', code: 'Digit9', width: 1, finger: 6 },
    { key: '0', label: '0', code: 'Digit0', width: 1, finger: 7 },
    { key: '-', label: '-', code: 'Minus', width: 1, finger: 7 },
    { key: '=', label: '=', code: 'Equal', width: 1, finger: 7 },
    { key: 'Backspace', label: '⌫', code: 'Backspace', width: 2, finger: 7 },
  ],
  [
    { key: 'Tab', label: 'Tab', code: 'Tab', width: 1.5, finger: 0 },
    { key: 'q', label: 'Q', code: 'KeyQ', width: 1, finger: 0 },
    { key: 'w', label: 'W', code: 'KeyW', width: 1, finger: 1 },
    { key: 'e', label: 'E', code: 'KeyE', width: 1, finger: 2 },
    { key: 'r', label: 'R', code: 'KeyR', width: 1, finger: 3 },
    { key: 't', label: 'T', code: 'KeyT', width: 1, finger: 3 },
    { key: 'y', label: 'Y', code: 'KeyY', width: 1, finger: 4 },
    { key: 'u', label: 'U', code: 'KeyU', width: 1, finger: 4 },
    { key: 'i', label: 'I', code: 'KeyI', width: 1, finger: 5 },
    { key: 'o', label: 'O', code: 'KeyO', width: 1, finger: 6 },
    { key: 'p', label: 'P', code: 'KeyP', width: 1, finger: 7 },
    { key: '[', label: '[', code: 'BracketLeft', width: 1, finger: 7 },
    { key: ']', label: ']', code: 'BracketRight', width: 1, finger: 7 },
    { key: '\\', label: '\\', code: 'Backslash', width: 1.5, finger: 7 },
  ],
  [
    { key: 'CapsLock', label: 'Caps', code: 'CapsLock', width: 1.75, finger: 0 },
    { key: 'a', label: 'A', code: 'KeyA', width: 1, finger: 0 },
    { key: 's', label: 'S', code: 'KeyS', width: 1, finger: 1 },
    { key: 'd', label: 'D', code: 'KeyD', width: 1, finger: 2 },
    { key: 'f', label: 'F', code: 'KeyF', width: 1, finger: 3 },
    { key: 'g', label: 'G', code: 'KeyG', width: 1, finger: 3 },
    { key: 'h', label: 'H', code: 'KeyH', width: 1, finger: 4 },
    { key: 'j', label: 'J', code: 'KeyJ', width: 1, finger: 4 },
    { key: 'k', label: 'K', code: 'KeyK', width: 1, finger: 5 },
    { key: 'l', label: 'L', code: 'KeyL', width: 1, finger: 6 },
    { key: ';', label: ';', code: 'Semicolon', width: 1, finger: 7 },
    { key: "'", label: "'", code: 'Quote', width: 1, finger: 7 },
    { key: 'Enter', label: 'Enter', code: 'Enter', width: 2.25, finger: 7 },
  ],
  [
    { key: 'Shift', label: 'Shift', code: 'ShiftLeft', width: 2.25, finger: 0 },
    { key: 'z', label: 'Z', code: 'KeyZ', width: 1, finger: 0 },
    { key: 'x', label: 'X', code: 'KeyX', width: 1, finger: 1 },
    { key: 'c', label: 'C', code: 'KeyC', width: 1, finger: 2 },
    { key: 'v', label: 'V', code: 'KeyV', width: 1, finger: 3 },
    { key: 'b', label: 'B', code: 'KeyB', width: 1, finger: 3 },
    { key: 'n', label: 'N', code: 'KeyN', width: 1, finger: 4 },
    { key: 'm', label: 'M', code: 'KeyM', width: 1, finger: 4 },
    { key: ',', label: ',', code: 'Comma', width: 1, finger: 5 },
    { key: '.', label: '.', code: 'Period', width: 1, finger: 6 },
    { key: '/', label: '/', code: 'Slash', width: 1, finger: 7 },
    { key: 'Shift', label: 'Shift', code: 'ShiftRight', width: 2.75, finger: 7 },
  ],
  [
    { key: 'Control', label: 'Ctrl', code: 'ControlLeft', width: 1.25, finger: 0 },
    { key: 'Meta', label: 'Win', code: 'MetaLeft', width: 1.25, finger: 0 },
    { key: 'Alt', label: 'Alt', code: 'AltLeft', width: 1.25, finger: 0 },
    { key: ' ', label: 'Space', code: 'Space', width: 6.25, finger: 8 },
    { key: 'Alt', label: 'Alt', code: 'AltRight', width: 1.25, finger: 7 },
    { key: 'Meta', label: 'Win', code: 'MetaRight', width: 1.25, finger: 7 },
    { key: 'Control', label: 'Ctrl', code: 'ControlRight', width: 1.25, finger: 7 },
  ],
];

export const FINGER_NAMES = [
  'L Pinky', 'L Ring', 'L Middle', 'L Index',
  'R Index', 'R Middle', 'R Ring', 'R Pinky',
  'Thumbs',
];

export const FINGER_COLORS = [
  '#ff6b6b', '#ffa502', '#ffd93d', '#6bff6b',
  '#6bff6b', '#ffd93d', '#ffa502', '#ff6b6b',
  '#69c0ff',
];

// Build a lookup: code -> key definition
export function buildCodeMap(rows) {
  const map = {};
  for (const row of rows) {
    for (const key of row) {
      map[key.code] = key;
    }
  }
  return map;
}
