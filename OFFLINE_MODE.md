# Offline Mode Guide

## 📡 Overview

The Tokyo Trip Planner now works **offline**! Once you load the app with internet, all your data is saved locally and can be accessed without internet connection in Japan.

---

## ✨ Features

### 1. **Service Worker Caching**
- Automatically caches all static assets (JS, CSS, images)
- Caches pages and API responses
- Network-first strategy with cache fallback
- Works automatically when offline

### 2. **LocalStorage Data Persistence**
All your data is saved locally:
- ✅ Itinerary & checklist progress
- ✅ Budget tracker
- ✅ Packing list
- ✅ Free time favorites
- ✅ Travel journal entries
- ✅ Theme preferences
- ✅ Language settings

### 3. **Auto-Save**
- Saves every 30 seconds automatically
- Saves on page close/refresh
- No manual save needed
- Data persists between sessions

### 4. **Backup & Restore**
- **Export**: Download all data as JSON file
- **Import**: Restore from backup file
- Check storage usage
- Access via 💾 button (bottom-right corner)

### 5. **Offline Indicator**
- Shows when you're offline (📡)
- Shows when back online (✅)
- Displays last sync time
- Dismissable notifications

### 6. **PWA Support**
- Add to home screen on mobile
- Works like a native app
- Custom app icon
- Full-screen mode

---

## 🔧 How It Works

### First Load (Online)
1. Open the app with internet connection
2. Service worker registers and caches assets
3. All data loads and saves to localStorage
4. Ready for offline use!

### Offline Mode
1. Turn off WiFi/mobile data
2. App still works normally
3. All your data is available
4. Changes are saved locally
5. Will sync when back online

### Back Online
1. Reconnect to internet
2. Service worker updates cache
3. Auto-sync saves latest data
4. Shows "Back Online" notification

---

## 📱 Add to Home Screen (PWA)

### iOS (Safari)
1. Open app in Safari
2. Tap Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"
5. App icon appears on home screen

### Android (Chrome)
1. Open app in Chrome
2. Tap menu (⋮)
3. Tap "Add to Home screen"
4. Tap "Add"
5. App icon appears on home screen

---

## 💾 Backup & Restore

### Export Data
1. Click 💾 button (bottom-right)
2. Click "Export Data"
3. Save JSON file to your device
4. Keep file safe as backup

### Import Data
1. Click 💾 button (bottom-right)
2. Click "Import Data"
3. Select backup JSON file
4. Page reloads automatically
5. All data restored!

### When to Backup
- Before major changes
- After completing checklist items
- Before traveling to Japan
- Regular weekly backups

---

## 🗂️ Data Storage

### What's Stored
```
localStorage Keys:
- tokyo-trip-offline-data (main backup)
- tokyo-trip-checklist (itinerary progress)
- tokyo-trip-budget (budget tracker)
- tokyo-trip-packing (packing list)
- freetime-favorites (favorite locations)
- tokyo-trip-journal (travel journal)
- tokyo-trip-theme (theme preference)
```

### Storage Limits
- Browser localStorage: ~5-10 MB
- Typical usage: <1 MB
- Plenty of room for all data

---

## 🔒 Privacy & Security

### All Data Stays Local
- No server storage
- No cloud sync
- No tracking
- Only on your device
- Export/import gives you full control

### Clear Data
To clear all data:
1. Open browser DevTools (F12)
2. Go to Application tab
3. Clear localStorage
4. Or use browser settings

---

## ⚠️ Limitations

### What Works Offline
✅ All itinerary data
✅ Checklist progress
✅ Budget tracker
✅ Packing list
✅ Free time locations
✅ Emergency contacts
✅ Phrase book
✅ Transport guide

### What Needs Internet
❌ Google Maps embeds
❌ Weather updates
❌ Opening Maps app links
❌ Real-time transit updates

---

## 🐛 Troubleshooting

### App Not Loading Offline
1. Make sure you loaded the app online first
2. Check if service worker is registered (DevTools > Application > Service Workers)
3. Try reloading the page
4. Clear cache and reload

### Data Not Saving
1. Check if localStorage is enabled in browser
2. Try different browser
3. Clear localStorage and reload
4. Import from backup if available

### Service Worker Not Working
1. Check browser console for errors
2. Clear site data and reload
3. Try in incognito/private mode
4. Update browser to latest version

### Storage Full
1. Export and backup data
2. Clear old/unused data
3. Check storage usage in 💾 panel
4. Use different browser/device

---

## 🚀 Performance Tips

1. **Load app online first** - Before going offline
2. **Backup regularly** - Export data weekly
3. **Keep tab open** - Auto-save works while open
4. **Test offline mode** - Try before traveling
5. **Add to home screen** - Faster access like native app

---

## 📊 Storage Usage

Check how much space your data uses:
1. Click 💾 button
2. See storage bar and percentage
3. Typical usage: 0.1-0.5 MB
4. Limit: 5-10 MB (varies by browser)

---

## 🎯 Best Practices

### Before Trip
- [ ] Load app online at home
- [ ] Complete checklist items
- [ ] Add budget entries
- [ ] Favorite important locations
- [ ] Export backup file
- [ ] Test offline mode
- [ ] Add to home screen

### During Trip
- [ ] Use app normally (works offline)
- [ ] Check off completed items
- [ ] Add expenses to budget
- [ ] Write journal entries
- [ ] Auto-save handles the rest

### After Trip
- [ ] Export final backup
- [ ] Keep data for future reference
- [ ] Clear data if desired
- [ ] Share backup with travel buddies

---

## 💡 Pro Tips

1. **Screenshot important info** - Easy access offline
2. **Download maps** - Use Google Maps offline feature
3. **Test before travel** - Try offline mode at home
4. **Keep backup in cloud** - Google Drive, Dropbox, etc.
5. **Share backup** - Send to travel companion

---

## 🆘 Support

If you encounter issues:
1. Check browser console (F12)
2. Try in incognito mode
3. Clear cache and reload
4. Import from backup
5. Try different browser

---

**Enjoy your trip to Tokyo! 🗼🌸**

The app works offline so you can focus on exploring without worrying about internet connection.
