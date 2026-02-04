#!/bin/bash

# TradingBots Status Script
# Visar status för backend och frontend

echo "📊 Server Status"
echo ""

# Backend
if lsof -ti:8080 > /dev/null 2>&1; then
    PID=$(lsof -ti:8080 | head -1)
    echo "  ✓ Backend körs"
    echo "    URL: http://localhost:8080"
    echo "    PID: $PID"
else
    echo "  ✗ Backend stoppad"
fi

echo ""

# Frontend
if lsof -ti:5173 > /dev/null 2>&1; then
    PID=$(lsof -ti:5173 | head -1)
    echo "  ✓ Frontend körs"
    echo "    URL: http://localhost:5173"
    echo "    PID: $PID"
else
    echo "  ✗ Frontend stoppad"
fi

echo ""
