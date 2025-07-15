---
title: TradeTally
description: TradeTally Widget Configuration
---

Learn more about [TradeTally](https://tradetally.io/).

TradeTally is a comprehensive trading journal and analytics platform that helps track trades, analyze performance, and gain insights into trading patterns.

**Available fields:**
- `total_pnl` - Total profit/loss
- `win_rate` - Win rate percentage
- `total_trades` - Total completed trades
- `total_executions` - Total trade executions
- `winning_trades` - Number of winning trades
- `losing_trades` - Number of losing trades
- `breakeven_trades` - Number of breakeven trades
- `avg_win` - Average winning trade
- `avg_loss` - Average losing trade
- `best_trade` - Best single trade
- `worst_trade` - Worst single trade
- `total_commissions` - Total commission costs
- `total_fees` - Total fees paid
- `profit_factor` - Profit factor ratio
- `sqn` - System Quality Number
- `k_ratio` - K-Ratio
- `kelly_percentage` - Kelly percentage
- `probability_random` - Probability of random chance
- `avg_mae` - Average Maximum Adverse Excursion
- `avg_mfe` - Average Maximum Favorable Excursion

The widget requires API key authentication with your TradeTally instance.

## API Key Authentication

To generate an API key:
1. Log in to your TradeTally instance
2. Go to Settings > API Keys
3. Create a new API key with appropriate permissions

```yaml
widget:
  type: tradetally
  url: https://your-tradetally-instance.com
  key: tt_live_your_api_key_here  # TradeTally API keys start with tt_live_
```

**Note**: TradeTally API keys start with `tt_live_` and are sent as Bearer tokens in the Authorization header.

## Custom Fields

By default, the widget displays: `["total_pnl", "win_rate", "total_trades", "total_executions"]`

You can customize which metrics to display by specifying the `fields` parameter:

```yaml
widget:
  type: tradetally
  url: https://your-tradetally-instance.com
  key: your-api-key
  fields: ["total_pnl", "win_rate", "profit_factor", "avg_win"]
```

**Example configurations:**

**Basic Overview:**
```yaml
fields: ["total_pnl", "win_rate", "total_trades", "total_executions"]
```

**Advanced Metrics:**
```yaml
fields: ["profit_factor", "sqn", "k_ratio", "kelly_percentage"]
```

**Performance Analysis:**
```yaml
fields: ["avg_win", "avg_loss", "best_trade", "worst_trade"]
```

**Cost Analysis:**
```yaml
fields: ["total_pnl", "total_commissions", "total_fees", "profit_factor"]
```

## Date Range

You can specify a date range for the analytics:

```yaml
widget:
  type: tradetally
  url: https://your-tradetally-instance.com
  key: your-api-key
  dateRange: "30d"  # Options: "today", "7d", "30d", "90d", "ytd", "all"
```

## Widget Metrics

The widget can display any combination of the available metrics. By default, it shows:

- **Total P&L**: Overall profit and loss across all trades
- **Win Rate**: Percentage of profitable trades
- **Total Trades**: Total number of completed trades
- **Executions**: Total number of trade executions (buy/sell orders)

**Features:**
- Color-coded values (green for positive, red for negative)
- Currency formatting for monetary values
- Percentage formatting for rates
- Proper formatting for ratios and advanced metrics
- Support for up to 4 fields per widget instance

## Self-Hosted Instances

For self-hosted TradeTally instances, generate an API key from your instance:

```yaml
widget:
  type: tradetally
  url: http://localhost:3000
  key: tt_live_your_api_key_here
```

## API Requirements

The widget requires access to the following TradeTally API endpoints:

- `/api/v2/analytics/overview` - For trade statistics and P&L data
- Authentication via Bearer token (API key only)

Make sure your TradeTally instance allows API access from your Homepage instance's IP address.
