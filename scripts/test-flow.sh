#!/bin/bash

echo "🌌 CRAZY SEXY COOL — Full Integration Test"
echo "=========================================="

echo "📜 Step 1: Compiling contracts..."
cd ~/crazy-sexy-cool/contracts
forge build
if [ $? -ne 0 ]; then echo "❌ Contract compilation failed"; exit 1; fi
echo "✅ Contracts compiled"

echo "🧪 Step 2: Running contract tests..."
forge test
if [ $? -ne 0 ]; then echo "❌ Contract tests failed"; exit 1; fi
echo "✅ Contract tests passed"

echo "⚛️ Step 3: Building frontend..."
cd ~/crazy-sexy-cool/frontend
npm install
npm run build
if [ $? -ne 0 ]; then echo "❌ Frontend build failed"; exit 1; fi
echo "✅ Frontend built"

echo "🔮 Step 4: Building backend..."
cd ~/crazy-sexy-cool/backend
npm install
npm run build
if [ $? -ne 0 ]; then echo "❌ Backend build failed"; exit 1; fi
echo "✅ Backend built"

echo "🌐 Step 5: Testing backend..."
node dist/index.js &
BACKEND_PID=$!
sleep 2
curl -s http://localhost:3001/health > /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Backend failed to start"
    kill $BACKEND_PID
    exit 1
fi
echo "✅ Backend running"
kill $BACKEND_PID

echo ""
echo "🎉 ALL SYSTEMS OPERATIONAL"
echo "=========================="
echo ""
echo "Next steps:"
echo "1. Deploy contracts: cd contracts && source .env && forge script script/Deploy.s.sol --rpc-url \$BASE_SEPOLIA_RPC --broadcast"
echo "2. Update frontend/src/utils/wagmi.ts with deployed addresses"
echo "3. Deploy frontend: cd frontend && vercel --prod"
echo "4. Deploy backend: cd backend && railway up"
