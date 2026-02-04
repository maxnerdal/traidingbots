#!/bin/bash

# TradingBots Development Script
# Startar backend och frontend

echo "� Kollar serverstatus..."
echo ""

BACKEND_RUNNING=false
FRONTEND_RUNNING=false
BACKEND_STARTED=false
FRONTEND_STARTED=false

# Kolla om backend körs
if lsof -ti:8080 > /dev/null 2>&1; then
    BACKEND_RUNNING=true
    BACKEND_PID=$(lsof -ti:8080 | head -1)
    echo "  ✓ Backend körs redan (PID: $BACKEND_PID)"
else
    echo "  ✗ Backend körs inte"
fi

# Kolla om frontend körs
if lsof -ti:5173 > /dev/null 2>&1; then
    FRONTEND_RUNNING=true
    FRONTEND_PID=$(lsof -ti:5173 | head -1)
    echo "  ✓ Frontend körs redan (PID: $FRONTEND_PID)"
else
    echo "  ✗ Frontend körs inte"
fi

echo ""

# Starta backend om den inte körs
if [ "$BACKEND_RUNNING" = false ]; then
    echo "📦 Startar backend..."
    cd tradingbots-backend
    mvn spring-boot:run > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    BACKEND_STARTED=true
    sleep 3
fi

# Starta frontend om den inte körs
if [ "$FRONTEND_RUNNING" = false ]; then
    echo "⚛️  Startar frontend..."
    cd tradingbots-frontend
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    FRONTEND_STARTED=true
fi

# Vänta längre om backend startades
if [ "$BACKEND_STARTED" = true ]; then
    echo ""
    echo "⏳ Väntar på att backend ska starta (15 sek)..."
    sleep 15
elif [ "$FRONTEND_STARTED" = true ]; then
    echo ""
    echo "⏳ Väntar på att frontend ska starta..."
    sleep 5
fi

echo ""
echo "✅ Status:"
echo ""

# Kolla backend
if lsof -ti:8080 > /dev/null 2>&1; then
    if [ "$BACKEND_STARTED" = true ]; then
        echo "  ✓ Backend startad på http://localhost:8080"
    else
        echo "  ✓ Backend körs på http://localhost:8080"
    fi
    echo "    PID: $(lsof -ti:8080 | head -1)"
    echo "    Log: backend.log"
else
    echo "  ✗ Backend startade inte (kolla backend.log)"
fi

# Kolla frontend
if lsof -ti:5173 > /dev/null 2>&1; then
    if [ "$FRONTEND_STARTED" = true ]; then
        echo "  ✓ Frontend startad på http://localhost:5173"
    else
        echo "  ✓ Frontend körs på http://localhost:5173"
    fi
    echo "    PID: $(lsof -ti:5173 | head -1)"
    echo "    Log: frontend.log"
else
    echo "  ✗ Frontend startade inte (kolla frontend.log)"
fi

echo ""
echo "📝 Användbara kommandon:"
echo "  tail -f backend.log    # Följ backend-loggar"
echo "  tail -f frontend.log   # Följ frontend-loggar"
echo "  ./stop.sh              # Stoppa båda servrarna"
echo ""
