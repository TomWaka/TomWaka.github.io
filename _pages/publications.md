---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

## Publications

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

- Wakayama, T. and Sugasawa, S. (2024), "Functional Horseshoe Smoothing for Functional Trend Estimation". Statistica Sinica, accepted. (publication, arXiv)

- Wakayama, T. and Imaizumi, M. (2024), "Fast Convergence on Perfect Classification for Functional Data". Statistica Sinica, accepted. (publication, arXiv)

- Wakayama, T. and Sugasawa, S. (2023), "Trend Filtering for Functional Data". Stat, published. (open access, code)

## Preprints

- Wakayama, T. (2024), "Bayesian Inference for Consistent Predictions in Overparameterized Nonlinear Regression", arXiv preprint, arXiv:2404.04498.

- Wakayama, T., and Matsui, H. (2023), "Functional Data Regression Reconciles with Excess Bases", arXiv preprint, arXiv:2308.01724.

- Wakayama, T., Sugasawa, S., Kobayashi, G. (2023), "Similarity-based Random Partition Distribution for Clustering Functional Data", arXiv preprint, arXiv:2308.01704arXiv:2308.01724

- Wakayama, T. and Imaizumi, M. (2023), "Bayesian Analysis for Over-parameterized Linear Model without Sparsity", arXiv preprint, arxiv:2305.15754 

- Wakayama, T. and Sugasawa, S. (2023), "Spatiotemporal factor models for functional data with application to population map forecast". arXiv preprint. arxiv:2302.04412,  code
