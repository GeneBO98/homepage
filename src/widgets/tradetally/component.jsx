import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  // Default fields if not specified by user
  const defaultFields = ["total_pnl", "win_rate", "total_trades", "total_executions"];
  const displayFields = widget.fields || defaultFields;

  const { data: overview, error: overviewError } = useWidgetAPI(widget, "overview");

  if (overviewError) {
    return <Container service={service} error={overviewError} />;
  }

  if (!overview) {
    return (
      <Container service={service}>
        {displayFields.map((field) => (
          <Block key={field} label={`tradetally.${field}`} />
        ))}
      </Container>
    );
  }

  // Handle case where overview might be an error response
  if (overview.error || overview.statusCode === 401) {
    return <Container service={service} error={overview} />;
  }

  // Extract data from overview response - TradeTally API returns { overview: {...} }
  const stats = overview.overview || overview;

  // Calculate today's trades count - TradeTally doesn't provide individual trades in overview
  // This would require a separate API call, so we'll show total trades instead for now
  const totalTrades = stats.total_trades || 0;

  // TradeTally doesn't provide open positions in overview endpoint
  // We'll show total executions as a proxy
  const totalExecutions = stats.total_executions || 0;

  // Extract total P&L from the overview response
  const totalPnL = parseFloat(stats.total_pnl) || 0;

  // Function to format and render a field value
  const formatFieldValue = (fieldName) => {
    const value = parseFloat(stats[fieldName]) || 0;

    switch (fieldName) {
      case "total_pnl":
      case "avg_win":
      case "avg_loss":
      case "best_trade":
      case "worst_trade":
      case "total_commissions":
      case "total_fees":
        const color = value >= 0 ? "text-emerald-300" : "text-rose-300";
        return (
          <span className={color}>
            {value >= 0 ? "+" : ""}
            {t("common.number", {
              value: value,
              style: "currency",
              currency: "USD",
            })}
          </span>
        );

      case "win_rate":
        const winRateColor = value >= 50 ? "text-emerald-300" : "text-rose-300";
        return (
          <span className={winRateColor}>
            {t("common.percent", {
              value: value,
              maximumFractionDigits: 1,
            })}
          </span>
        );

      case "profit_factor":
      case "sqn":
      case "k_ratio":
        return <span className={value >= 1 ? "text-emerald-300" : "text-rose-300"}>{value.toFixed(2)}</span>;

      case "kelly_percentage":
        return <span className={value >= 0 ? "text-emerald-300" : "text-rose-300"}>{value}%</span>;

      case "total_trades":
      case "winning_trades":
      case "losing_trades":
      case "breakeven_trades":
      case "total_executions":
        return t("common.number", { value: Math.round(value) });

      case "avg_mae":
      case "avg_mfe":
      case "probability_random":
        return stats[fieldName] || "N/A";

      default:
        return t("common.number", { value: value });
    }
  };

  return (
    <Container service={service}>
      {displayFields.map((field) => (
        <Block key={field} label={`tradetally.${field}`} value={formatFieldValue(field)} />
      ))}
    </Container>
  );
}
