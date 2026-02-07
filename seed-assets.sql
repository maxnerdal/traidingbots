-- Seed common cryptocurrencies for TradingBots production database
-- Run this on Railway database to populate initial assets

INSERT INTO digital_assets (symbol, name, coingecko_id, icon_url, created_at, updated_at) VALUES
('BTC', 'Bitcoin', 'bitcoin', 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', NOW(), NOW()),
('ETH', 'Ethereum', 'ethereum', 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', NOW(), NOW()),
('USDT', 'Tether', 'tether', 'https://assets.coingecko.com/coins/images/325/large/Tether.png', NOW(), NOW()),
('BNB', 'BNB', 'binancecoin', 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', NOW(), NOW()),
('SOL', 'Solana', 'solana', 'https://assets.coingecko.com/coins/images/4128/large/solana.png', NOW(), NOW()),
('USDC', 'USD Coin', 'usd-coin', 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png', NOW(), NOW()),
('XRP', 'XRP', 'ripple', 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', NOW(), NOW()),
('ADA', 'Cardano', 'cardano', 'https://assets.coingecko.com/coins/images/975/large/cardano.png', NOW(), NOW()),
('DOGE', 'Dogecoin', 'dogecoin', 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', NOW(), NOW()),
('AVAX', 'Avalanche', 'avalanche-2', 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', NOW(), NOW()),
('TRX', 'TRON', 'tron', 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png', NOW(), NOW()),
('DOT', 'Polkadot', 'polkadot', 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', NOW(), NOW()),
('MATIC', 'Polygon', 'matic-network', 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', NOW(), NOW()),
('LINK', 'Chainlink', 'chainlink', 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', NOW(), NOW()),
('SHIB', 'Shiba Inu', 'shiba-inu', 'https://assets.coingecko.com/coins/images/11939/large/shiba.png', NOW(), NOW()),
('UNI', 'Uniswap', 'uniswap', 'https://assets.coingecko.com/coins/images/12504/large/uni.jpg', NOW(), NOW()),
('LTC', 'Litecoin', 'litecoin', 'https://assets.coingecko.com/coins/images/2/large/litecoin.png', NOW(), NOW()),
('ATOM', 'Cosmos', 'cosmos', 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png', NOW(), NOW()),
('XLM', 'Stellar', 'stellar', 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png', NOW(), NOW()),
('BCH', 'Bitcoin Cash', 'bitcoin-cash', 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png', NOW(), NOW())
ON CONFLICT (symbol) DO NOTHING;
