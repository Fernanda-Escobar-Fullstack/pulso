# Pulso --- Product Definition

> **Status:** Initial product definition\
> **Project:** Pulso\
> **Document type:** Product documentation\
> **Primary market hypothesis:** Small and medium-sized gastronomic
> businesses, initially with a focus on Bolivia\
> **Purpose:** Define why Pulso should exist, who it serves, the value
> it intends to provide, and what the project is intended to
> demonstrate.

------------------------------------------------------------------------

## 1. Product Overview

Pulso is a web application for management, cost control, and business
analysis designed for small and medium-sized gastronomic businesses such
as cafés, bakeries, pastry shops, hamburger restaurants, and similar
establishments.

Its purpose is to help the person responsible for the business
understand what products actually cost, how much margin they generate,
how changes in ingredient prices affect profitability, and whether
inventory, purchasing, sales, and operating data show situations that
require attention.

Pulso is intended to reduce the dependence on intuition, paper records,
manually maintained spreadsheets, and fragmented information when making
operational and pricing decisions.

The long-term vision is for Pulso to act as an intelligent operational
assistant for the business. Financial and inventory calculations must
remain deterministic and verifiable, while artificial intelligence
provides an additional layer for interpreting information, identifying
relevant patterns, explaining results in simple language, accepting
natural-language or voice input, and assisting the user in reviewing
situations that may require a decision.

------------------------------------------------------------------------

## 2. Problem Statement

Many small and medium-sized gastronomic businesses do not have a simple
and reliable way to know the real and current cost of the products they
sell.

Product prices may be defined using estimates, intuition, competitor
prices, incomplete spreadsheets, or calculations that are not updated
when ingredient prices change. As a result, the owner or manager may not
know the actual margin of a product or may continue selling it at a
price that is no longer appropriate.

The same lack of visibility can affect inventory and purchasing. A
business may purchase ingredients or supplies without having a clear
relationship between what was purchased, what should have been consumed
according to sales, what remains in physical inventory, and what may
have been wasted, incorrectly recorded, used outside normal operations,
or otherwise lost.

The fundamental problem Pulso intends to address is therefore not simply
a lack of records. It is a lack of **usable, connected, and
understandable information for making cost, pricing, purchasing, and
inventory decisions**.

------------------------------------------------------------------------

## 3. Origin of the Problem

The idea for Pulso comes from direct observation of gastronomic
businesses.

The problem has been observed through personal work experience in
restaurants and through close contact with people working in cafés. In
these environments, cost calculations, inventory control, and pricing
decisions are not always supported by complete or updated information.

This constitutes useful initial qualitative evidence that the problem
exists.

However, this experience is **not sufficient to conclude that the same
problem occurs in most gastronomic businesses in Bolivia or other
markets**. Its prevalence, severity, and commercial relevance remain
assumptions that require further validation.

------------------------------------------------------------------------

## 4. Target Users

### 4.1 Primary user

The primary user is the person responsible for the operational and
economic management of a gastronomic business.

Depending on the business, this may be:

-   the owner;
-   an administrator;
-   a manager; or
-   another person responsible for purchasing, pricing, inventory,
    sales, and general business control.

The role matters more than the job title: Pulso is intended for the
person who needs visibility into how the business is performing and what
is happening with its costs and resources.

### 4.2 Initial business profile

The initial product is intended primarily for small and medium-sized
gastronomic businesses, especially businesses such as:

-   cafés;
-   bakeries;
-   pastry shops;
-   hamburger restaurants;
-   small restaurants; and
-   similar food and beverage businesses.

An illustrative early customer may operate with approximately ten
employees. This number is not currently a strict product constraint.

Pulso is not initially intended to compete with enterprise ERP systems
for large restaurant chains or complex multi-branch corporations.

### 4.3 Geographic focus

The initial problem hypothesis is strongly influenced by experiences in
Bolivia.

Bolivia is therefore a useful initial context for validation and
real-world testing. Pulso should nevertheless be designed with enough
separation between business logic and local assumptions to allow future
expansion if the product proves useful.

------------------------------------------------------------------------

## 5. How the Problem Is Currently Solved

Based on current observations, businesses may use one or several of the
following approaches:

### Paper records

Some businesses record purchases, expenses, inventory, or calculations
manually.

This has a low technological barrier but makes information difficult to
maintain, relate, search, update, and analyze over time.

### Spreadsheets

More organized businesses may use Excel or similar spreadsheet tools for
costs, purchases, inventory, income, and expenses.

Spreadsheets can be powerful, but their effectiveness depends heavily on
the person creating and maintaining them. Building formulas, keeping
prices updated, connecting recipes with purchases, and interpreting the
results can become difficult for business owners without strong
spreadsheet or financial skills.

### Administrative or POS software

Some businesses use software that records income, expenses, or sales.

These systems may solve part of the operational problem, but Pulso's
hypothesis is that there is still room for a product focused
specifically on understandable cost intelligence, recipe economics,
purchasing impact, inventory differences, and proactive explanations.

This assumption must be validated against actual competing products
before making strong market differentiation claims.

### Intuition and informal calculations

Some decisions may simply be made using experience, competitor prices,
mental calculations, or rough estimates.

This becomes increasingly risky when ingredient prices change frequently
or when the business has many products with different recipes.

------------------------------------------------------------------------

## 6. Main Pain Points

The initial pain points identified are:

-   Difficulty calculating the real cost of each product.
-   Product costs becoming outdated when ingredient prices change.
-   Pricing decisions being made without knowing the actual margin.
-   Difficulty determining whether a product is still profitable.
-   Difficulty deciding how much a product should be sold for.
-   Manual and repetitive spreadsheet maintenance.
-   Lack of financial or spreadsheet knowledge among some entrepreneurs.
-   Purchases, recipes, sales, and inventory existing as disconnected
    information.
-   Difficulty identifying unexplained inventory differences.
-   Difficulty understanding whether additional consumption represents
    waste, recording errors, operational use, or another cause.
-   Lack of proactive warnings when important business conditions
    change.
-   Difficulty interpreting raw numbers without specialized financial
    knowledge.
-   Time and effort required to perform routine business closing and
    control processes.

------------------------------------------------------------------------

## 7. Value Proposition

**Pulso helps small and medium-sized gastronomic businesses understand
what their products really cost, what margin they are generating, and
how changes in purchases, prices, and inventory affect the business,
without requiring the owner to build and interpret complex
spreadsheets.**

Instead of functioning only as a record-keeping system, Pulso aims to
connect operational data and transform it into information the person
responsible for the business can understand and act on.

------------------------------------------------------------------------

## 8. Primary Benefit

The primary benefit of Pulso is:

> **Help the business detect deteriorating margins and cost-related
> problems before they become unnoticed losses.**

Secondary benefits include improved inventory visibility, easier cost
updates, better purchasing awareness, and simpler interpretation of
business information.

------------------------------------------------------------------------

## 9. Product Principles

### 9.1 Calculations must be deterministic

Core financial and inventory calculations must not depend on a language
model.

Costs, margins, quantities, expected consumption, inventory differences,
and other critical numerical results should be produced by deterministic
business logic that can be tested and reproduced.

### 9.2 AI interprets; it does not invent business facts

Artificial intelligence may explain, summarize, classify, assist with
data entry, detect situations worth reviewing, and communicate results.

It must not fabricate purchases, inventory counts, sales, prices, costs,
or other business facts.

### 9.3 Uncertainty should be explicit

When the system does not have enough information to determine what
happened, it should communicate the discrepancy rather than invent an
explanation.

For example, an inventory difference must not automatically be described
as theft. It may represent waste, breakage, complimentary products,
recording mistakes, incorrect recipes, unrecorded consumption, theft, or
another cause.

### 9.4 Important changes may require user confirmation

Not every unusual purchase should automatically redefine the standard
cost of an ingredient.

For example, if eggs are normally purchased in bulk but an emergency
purchase is made at a much higher unit price, Pulso may identify the
unusual price and ask whether the purchase should become the new
reference cost or be treated as an exceptional purchase.

The final business decision remains with the user.

### 9.5 Simplicity is part of the product value

The target user should not need advanced knowledge of accounting,
spreadsheets, or artificial intelligence to obtain useful information
from Pulso.

------------------------------------------------------------------------

## 10. Intended Product Capabilities

The long-term product vision includes the ability to connect information
across the following areas:

-   ingredients and supplies;
-   products;
-   recipes;
-   purchases;
-   historical purchase prices;
-   sales;
-   expenses;
-   inventory;
-   waste or shrinkage;
-   product costs;
-   product margins;
-   operating expenses;
-   employee salaries;
-   rent and services;
-   stock alerts;
-   shift opening and closing;
-   daily business summaries;
-   cash-control information;
-   business reports;
-   price and promotion simulations;
-   anomaly or discrepancy review;
-   natural-language interaction;
-   voice-assisted data entry; and
-   AI-assisted explanations and recommendations.

These capabilities describe the **product vision**, not the scope of the
first implementation.

------------------------------------------------------------------------

## 11. Example Product Behaviors

### Ingredient price impact

If chocolate previously cost Bs 60/kg and a new purchase is registered
at Bs 80/kg, Pulso should be able to determine which recipes use
chocolate and calculate how the change affects their cost and margin.

The calculation is performed by the deterministic cost engine. AI may
explain the impact in natural language.

### Exceptional purchase

If an ingredient is normally purchased in one format and a more
expensive emergency purchase is registered, Pulso should not blindly
assume that the new purchase represents the permanent reference price.

It may ask the user whether the purchase was exceptional before changing
the relevant cost assumptions.

### Inventory discrepancy

If 100 takeaway cups are purchased but recorded sales account for only
82 expected cup usages, and the physical count confirms fewer units than
expected, Pulso may identify and quantify the difference.

It should present the discrepancy for review rather than claim to know
its cause.

### Consumption comparison

If two periods show similar ingredient purchases but substantially
different expected consumption according to sales, Pulso may flag the
difference and provide the underlying numbers for review.

------------------------------------------------------------------------

## 12. Role of Artificial Intelligence

AI is an important part of Pulso, but it is not the source of truth for
financial calculations.

Potential AI responsibilities include:

-   interpreting natural-language input;
-   supporting voice-based registration workflows;
-   explaining financial and operational results in simple language;
-   summarizing changes between periods;
-   identifying unusual situations that deserve attention;
-   asking contextual follow-up questions;
-   explaining why a product cost changed;
-   assisting the user in reviewing anomalies;
-   suggesting possible actions based on verified system data; and
-   generating understandable summaries and reports.

AI should operate using real application data and deterministic results
whenever it makes business-related explanations.

------------------------------------------------------------------------

## 13. What AI Must Not Do

AI must not:

-   invent transactions or inventory data;
-   assume an unregistered purchase or sale occurred;
-   silently modify important business information based only on
    inference;
-   present an uncertain cause as a confirmed fact;
-   calculate critical financial results exclusively through
    probabilistic language-model reasoning;
-   accuse employees or other people of theft based only on inventory
    differences;
-   replace explicit user confirmation when a consequential assumption
    is uncertain.

------------------------------------------------------------------------

## 14. Differentiators

Pulso intends to differentiate itself through the combination of several
characteristics rather than through AI alone.

### Connected cost intelligence

A change in the price of an ingredient should propagate through the
deterministic cost model to the recipes and products that depend on it.

### Proactive interpretation

The system should not only store information. It should help the user
notice relevant changes and understand why they matter.

### Deterministic financial core + AI assistance

Financial calculations remain testable and reproducible while AI makes
the resulting information easier to interact with and understand.

### Designed for non-specialists

The application should reduce the knowledge required to maintain useful
cost and margin information.

### Context-aware review

Pulso should distinguish between a numerical fact and a business
interpretation, asking the user when additional context is required.

### Potential voice-first workflows

Voice input may reduce friction when registering operational
information, particularly for users who find extensive manual data entry
tedious.

This remains a product hypothesis until usability is tested.

------------------------------------------------------------------------

## 15. Product Vision vs. Initial Version

Pulso's long-term vision is broad. The first version must not attempt to
implement every possible management function.

The core hypothesis should be demonstrated before expanding into a
complete gastronomic management platform.

An initial product should prioritize the smallest coherent workflow that
proves Pulso can:

1.  register the information required to calculate product costs;
2.  calculate those costs deterministically;
3.  calculate and expose product margins;
4.  update the economic impact when relevant ingredient costs change;
5.  preserve purchase-price history;
6.  communicate important changes clearly; and
7.  use AI to explain verified results without becoming the financial
    calculation engine.

Inventory reconciliation, shifts, cash closing, payroll, extensive
expense management, advanced forecasting, multi-device pricing plans,
and other capabilities may be introduced in later phases according to
project priorities and real-world feedback.

The exact MVP scope should be defined in a separate **MVP Scope**
document.

------------------------------------------------------------------------

## 16. Product Goals

### Primary product goals

-   Build a usable application that solves a real cost-control problem
    for a gastronomic business.
-   Make recipe and product costing understandable to users without
    advanced financial knowledge.
-   Keep costs and margins responsive to changes in ingredient prices.
-   Provide clear visibility into why costs changed.
-   Reduce dependence on manually maintained spreadsheets for the core
    workflow.
-   Test Pulso with at least one real gastronomic business.
-   Establish a foundation that can evolve without requiring the
    application to be rebuilt from scratch.

### Longer-term product goals

-   Expand operational visibility into inventory, purchases, sales,
    expenses, and business closing.
-   Support multiple businesses or tenants if Pulso evolves into a
    commercial SaaS.
-   Potentially support multiple devices/users per business.
-   Explore a subscription-based commercial model.
-   Extend the product based on validated business needs rather than
    implementing every possible feature in advance.

------------------------------------------------------------------------

## 17. Definition of Product Success

The first meaningful success criterion is not simply that the software
runs.

Pulso should demonstrate that a real gastronomic business can provide
real operational information and receive correct, understandable, and
useful cost information in return.

Initial success indicators include:

-   products and their required inputs can be represented correctly;
-   costs are calculated consistently;
-   margins reflect the underlying deterministic calculations;
-   ingredient-price changes affect the correct products;
-   the system can explain the source of important changes;
-   the user can understand the results without reconstructing the
    calculations manually; and
-   a real business can use the workflow with its own data.

Commercial success metrics, retention targets, pricing, and
willingness-to-pay thresholds have not yet been defined.

------------------------------------------------------------------------

## 18. Technical Learning Goals

Pulso is also a deliberate engineering-learning project.

The project should provide practical experience with:

-   production-oriented AI integration;
-   deterministic business-rule engines;
-   secure backend development;
-   authentication and authorization;
-   scalable application architecture;
-   clean separation of responsibilities;
-   caching strategies where justified;
-   queues and asynchronous processing where justified;
-   database modeling for interconnected business data;
-   API design;
-   automated testing;
-   deployment and hosting;
-   CI/CD;
-   monitoring and operational reliability;
-   secure handling of business data; and
-   maintainable engineering documentation.

Technology choices should be justified by product and architectural
requirements rather than selected only because a particular language is
associated with AI.

------------------------------------------------------------------------

## 19. AI Engineering Learning Goals

The project should demonstrate the ability to use AI as an engineering
component rather than as a superficial chatbot feature.

Learning goals include:

-   integrating language models into a real application;
-   grounding AI responses in application data;
-   separating deterministic calculations from probabilistic
    interpretation;
-   designing structured outputs and tool/function workflows;
-   handling uncertainty and missing data;
-   implementing AI guardrails;
-   evaluating AI behavior;
-   exploring voice-assisted workflows;
-   using AI effectively during software development; and
-   exploring AI-assisted code review and security-review workflows
    without treating AI review as a substitute for conventional testing
    or security practices.

------------------------------------------------------------------------

## 20. Frontend Learning Goals

The frontend should prioritize usability over unnecessary visual
complexity.

Goals include:

-   creating an intuitive interface for non-technical users;
-   making cost and margin information easy to understand;
-   designing efficient data-entry workflows;
-   presenting warnings without overwhelming the user;
-   making AI interaction feel integrated with the application rather
    than separate from it;
-   supporting responsive web usage; and
-   learning to structure a maintainable frontend application.

The frontend technology has not yet been selected.

------------------------------------------------------------------------

## 21. Backend Learning Goals

Backend goals include:

-   implementing business rules correctly;
-   designing a secure API;
-   building a maintainable domain model;
-   implementing appropriate authorization boundaries;
-   maintaining historical financial data;
-   supporting deterministic recalculation;
-   understanding caching and invalidation;
-   using background processing where appropriate;
-   designing for future scalability without premature overengineering;
-   implementing reliable validation and error handling; and
-   building strong automated test coverage around critical
    calculations.

The backend technology has not yet been selected.

------------------------------------------------------------------------

## 22. Portfolio Goals

Pulso should demonstrate more than the ability to build CRUD screens.

The repository should make the engineering process visible and show that
the developer can:

-   identify and frame a real problem;
-   translate business problems into software requirements;
-   integrate AI appropriately into a real-world workflow;
-   distinguish AI responsibilities from deterministic application
    logic;
-   design secure and maintainable systems;
-   reason about scalability;
-   test critical business logic;
-   deploy a usable application;
-   document architecture and technical decisions;
-   maintain disciplined Git practices;
-   explain trade-offs; and
-   evolve a product through documented phases.

The desired portfolio impression is that the developer understands how
to **apply AI to real problems responsibly and integrate it into
well-engineered software**, rather than simply calling an AI API.

------------------------------------------------------------------------

## 23. Commercial Direction

Pulso is initially a portfolio and learning project, but it should be
built with the possibility of becoming a real product.

If real-world validation is positive, a future commercial model may use
a monthly subscription per business.

A possible future pricing dimension is the number of supported devices
or users, while keeping core functionality consistent between plans.

This is currently a product idea, **not a validated pricing strategy**.

Pricing, packaging, willingness to pay, and multi-tenant requirements
require separate validation before implementation.

------------------------------------------------------------------------

## 24. Assumption Log

  -----------------------------------------------------------------------------------------------
  ID             Assumption          Current evidence         Status         Validation approach
  -------------- ------------------- ------------------------ -------------- --------------------
  A-01           Some gastronomic    Direct personal          Partially      Interview
                 businesses do not   observation and close    supported      owners/managers and
                 know the real cost  industry exposure.                      test with real
                 of all products                                             business data.
                 they sell.                                                  

  A-02           The problem is      Anecdotal/local          Unvalidated    Conduct structured
                 common among small  observation only.                       interviews across
                 and medium                                                  multiple businesses.
                 gastronomic                                                 
                 businesses in                                               
                 Bolivia.                                                    

  A-03           Spreadsheet-based   Observed informally.     Partially      Ask users how they
                 costing is                                   supported      currently calculate
                 difficult or                                                and update costs.
                 tedious for part of                                         
                 the target market.                                          

  A-04           Users would prefer  No direct product usage  Unvalidated    Compare real
                 Pulso over          evidence yet.                           workflow after pilot
                 maintaining their                                           usage.
                 own spreadsheet.                                            

  A-05           Automatic           Strong logical           Unvalidated    Test with
                 ingredient-price    relationship to          with users     historical/real
                 propagation         identified problem.                     purchases and gather
                 provides meaningful                                         feedback.
                 value.                                                      

  A-06           Proactive alerts    Product hypothesis.      Unvalidated    Observe whether
                 will help users                                             alerts cause useful
                 make better                                                 actions during
                 decisions.                                                  pilot.

  A-07           AI explanations     Product hypothesis.      Unvalidated    Compare
                 make financial                                              comprehension with
                 information easier                                          and without AI
                 to understand.                                              explanations.

  A-08           Voice input will    User                     Unvalidated    Usability testing
                 materially reduce   preference/hypothesis.                  with real users.
                 registration                                                
                 friction.                                                   

  A-09           Users will          No evidence yet.         Unvalidated    Pilot with a real
                 consistently                                                business over time.
                 register enough                                             
                 information for the                                         
                 calculations to                                             
                 remain reliable.                                            

  A-10           Inventory           Based on observed        Unvalidated    Measure usefulness
                 discrepancies are   operational problems.                   versus workflow
                 valuable enough to                                          burden.
                 justify additional                                          
                 data-entry effort.                                          

  A-11           A real business     No usage evidence yet.   Unvalidated    Real-world pilot.
                 will use Pulso                                              
                 regularly after                                             
                 initial setup.                                              

  A-12           Businesses would    No evidence yet.         Unvalidated    Willingness-to-pay
                 pay a monthly                                               interviews after
                 subscription for                                            demonstrating value.
                 Pulso.                                                      

  A-13           Device/user count   Initial business idea    Unvalidated    Pricing research and
                 is an appropriate   only.                                   customer interviews.
                 pricing dimension.                                          

  A-14           The product can     Initial product          Unvalidated    Compare workflows
                 serve several       assumption.                             across cafés,
                 gastronomic                                                 bakeries, pastry
                 business types                                              shops, and
                 without excessive                                           restaurants.
                 domain differences.                                         
  -----------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 25. Validation Strategy

The immediate project priority is building a strong portfolio-quality
implementation.

The current preference is to develop the initial product before
presenting a prototype to external businesses.

After an initial usable version exists, Pulso should be tested with a
real gastronomic business using real or representative operational data.

Access to owners and administrators is available, which creates an
opportunity for direct validation.

A negative signal would be that target users understand the product but
consistently consider the problem unimportant, prefer their existing
workflow, or find the additional registration effort greater than the
value of the resulting analysis.

Statements such as "I would use this" should not be treated as
sufficient validation. Actual usage behavior is stronger evidence.

------------------------------------------------------------------------

## 26. Non-Goals of This Document

This document does not decide:

-   the final MVP feature list;
-   the final technology stack;
-   the database schema;
-   the application architecture;
-   accounting methodology;
-   exact cost-allocation formulas;
-   inventory valuation methodology;
-   pricing or subscription tiers;
-   UX flows;
-   AI provider or model;
-   hosting provider; or
-   detailed security architecture.

Those decisions belong in later product, domain, and engineering
documentation.

------------------------------------------------------------------------

## 27. Definition of Done

This Product Definition is considered complete for the initial planning
phase when:

-   [x] The core problem is clearly stated.
-   [x] The initial target user is identifiable.
-   [x] Current alternatives are documented.
-   [x] Primary pain points are documented.
-   [x] The value proposition is understandable.
-   [x] The primary benefit is defined.
-   [x] Initial differentiators are documented.
-   [x] Product goals are documented.
-   [x] Technical learning goals are documented.
-   [x] Portfolio goals are documented.
-   [x] Assumptions requiring validation are explicitly separated from
    known observations.
-   [x] The project has a clear reason to exist.

------------------------------------------------------------------------

## 28. Next Documentation Step

The next product document should be:

**MVP Scope**

Its purpose will be to decide what Pulso V1 actually includes and,
equally importantly, what is intentionally postponed.

This should happen before selecting the final architecture and
technology stack.

