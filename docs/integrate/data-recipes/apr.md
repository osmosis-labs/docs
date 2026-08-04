---
description: Calculate pool APRs from incentives and swap fees.
sidebar_position: 11
---

# APR Calculation

## Introduction
APR for each pools is a metric that indicates the expected annualized return on investment for liquidity providers. APRs are calculated differently for CL pools and normal pools due to their distinct operational mechanisms.

## Concentrated Liquidity Pools

### Calculation:
- **APR for CL Pools**:

$$
\text{CL APR} = \left( \frac{\text{Spread Reward per Unit Liquidity}}{\text{Base Price}} + \frac{\text{Incentive Reward per Unit Liquidity}}{\text{Base Price}} \right) \times \frac{\text{Seconds in a Year}}{\text{Calculation Time Duration}} \times 100
$$

Where:
- **Spread Reward per Unit Liquidity**: This is the reward earned from the spread for providing liquidity, expressed per unit.
- **Incentive Reward per Unit Liquidity**: This is any additional incentive reward for providing liquidity, also expressed per unit.
- **Base Price**: The standardized value of one unit of liquidity in the pool, used to convert the reward values into a comparable base.
- **Seconds in a Year**: Represents the total number of seconds in a year, used for annualizing the return. It's calculated as \( 365.25 \times 24 \times 60 \times 60 \) to account for leap years.
- **Calculation Time Duration**: The duration in seconds over which the rewards were calculated 

## CFMM Liquidity Pools(Balancer pools, Stableswap Pools)

1. **Standard APR Calculation** (for 1 day, 7 days, and 14 days):
   - The APR is calculated for each time frame using the formula:

$$
\text{APR}_{\text{time frame}} = \left( \frac{\text{Distributed Amount}_{\text{time frame}} / 10^{\text{exponent}}}{\text{Liquidity}} \right) \times \text{Coin Price} \times \frac{365}{\text{Days}_{\text{time frame}}} \times 100
$$

   - Where:
     - `Distributed Amount_timeframe` is the sum of distributed rewards for the time frame (1 day, 7 days, or 14 days), in base units.
     - `exponent` is the coin's decimal exponent, so `10^exponent` converts base units to display units. Read it from the asset's metadata rather than assuming 6.
     - `Liquidity` is the total liquidity in USD for the pool, adjusted by the percentage bonded (if applicable).
     - `Coin Price` is the current price of the coin.
     - `Days_timeframe` is the number of days the distributed amount covers: 1, 7, or 14.

:::warning
The annualization factor must match the period the distributed amount covers. Dividing 365 by the
period's length in days does this: a 1-day total annualizes by `365`, a 7-day total by `365/7 ≈ 52.14`,
and a 14-day total by `365/14 ≈ 26.07`. Applying a flat `365` (or the combined `36500` with the
`× 100` folded in) to a multi-day total overstates the APR by exactly the number of days in the
period, so a 7-day figure comes out 7× too high and a 14-day figure 14× too high.
:::