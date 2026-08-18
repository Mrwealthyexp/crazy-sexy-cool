#!/bin/bash

# Test flow script for Crazy Sexy Cool

echo "Running tests..."

# Frontend tests
echo "Running frontend tests..."
cd frontend && npm run build && cd ..

# Backend tests
echo "Running backend tests..."
cd backend && npm run build && cd ..

# Contract tests
echo "Running contract tests..."
cd contracts && forge test && cd ..

echo "All tests completed!"
