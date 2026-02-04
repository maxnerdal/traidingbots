#!/bin/bash

# TradingBots Stop Script
# Stoppar backend och frontend

echo "🛑 Stoppar servrar..."
echo ""

# Döda backend (port 8080)
if lsof -ti:8080 > /dev/null 2>&1; then
    echo "  Stoppar backend (port 8080)..."
    kill $(lsof -ti:8080) 2>/dev/null
    sleep 1
    echo "  ✓ Backend stoppad"
else
    echo "  ℹ️  Backend körde inte"
fi

# Döda frontend (port 5173)
if lsof -ti:5173 > /dev/null 2>&1; then
    echo "  Stoppar frontend (port 5173)..."
    kill $(lsof -ti:5173) 2>/dev/null
    sleep 1
    echo "  ✓ Frontend stoppad"
else
    echo "  ℹ️  Frontend körde inte"
fi

echo ""
echo "✅ Klart!"
echo ""
