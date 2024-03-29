---
sidebar_position: 16
---

# Determination of Risk Level for Earn Strategies

## Overview

This page provides a brief and high-level overview of the Risk Levels displayed for each strategy on the Osmosis Zone app. 

## Introduction

The Earn page on the Osmosis Zone app displays various strategies that can utilize users' assets to try earning a yield. A risk level is displayed to users with for each strategy, and a risk level assessment is required. 

## How Risk Level is Calculated

Assessing the risk level of earn strategies involves a comprehensive evaluation across several key areas. Firstly, the strategy mechanics are scrutinized to determine the type of strategy and its dependency on off-chain actors. This analysis sheds light on the operational dynamics and potential vulnerabilities. Secondly, the strategy's Lindiness is examined, which includes assessing historical yield consistency and tracking project and strategy start dates. Additionally, the asset composition is evaluated to understand the nature of underlying deposit assets, whether they result in exposure to single or multiple assets, and the correlation among them. Safety controls are paramount, with scrutiny given to safety rate limits, oracle dependencies, and mechanisms to counter oracle manipulation. Governance structure is also a focal point, investigating the presence of controllers that could abscond with funds or pause the strategy, and ensuring the economic security of the governance system exceeds the Total Value Locked (TVL) of the strategy. Lastly, the transparency and reliability of the project's contracts, including their open-source nature and the number of audits conducted, are assessed to gauge the overall security posture. This multifaceted approach ensures a thorough understanding of the risk landscape associated with earn strategies, enabling informed decision-making and risk management strategies.

## Applying for Risk Level Assessment

To apply for a risk level assessment to be associated with your earn strategy, follow these steps:

- **Process Review**: See the [Risk Level section of the Earn CMS README](https://github.com/osmosis-labs/fe-content/tree/main/cms/earn#risk-level) in GitHub for latest details and instructions on the entire Strategy addition process.
- **Application Preparation**: Duplicate a copy of the [Earn Strategy Report Card Application Google Sheets Spreadsheet](https://docs.google.com/spreadsheets/d/1_FM7hJKl017wAaHcYybN3lGSMeJMqiuevNX6H8LGnD0).
- **Assessment Criteria**: Evaluate your strategy based on key factors including mechanics, Lindiness, asset composition, safety controls, governance.
- **Application Completion**: Fill out the duplicated copy of the Earn Strategy Report Card Application spreadsheet.
- **Submission**: Once completed, provide a link to the completed Application in the description of the GitHub Pull Request that adds the strategy to the [Earn page's CMS](https://github.com/osmosis-labs/fe-content/tree/main/cms/earn).
