import type { LegalDoc } from "./types";

export const REFUND: LegalDoc = {
  slug: "refund",
  title: "Refund & Cancellation Policy",
  sections: [
    {
      id: "overview",
      number: "1",
      title: "Overview",
      blocks: [
        {
          kind: "p",
          text: "Zart connects customers with vetted independent artisans. Payments made through Zart are subject to this Refund & Cancellation Policy."
        },
        {
          kind: "p",
          text: "By booking a service on Zart, you agree to the terms below."
        }
      ]
    },
    {
      id: "service-cancellations",
      number: "2",
      title: "Service cancellations",
      blocks: [
        { kind: "h3", text: "a. Customer-initiated cancellations" },
        {
          kind: "list",
          style: "bullet",
          items: [
            {
              text: "Customers may cancel a service before an artisan is dispatched for a full refund."
            },
            {
              text: "If an artisan has already been assigned or has started work, cancellation fees may apply."
            }
          ]
        },
        { kind: "h3", text: "b. Artisan-initiated cancellations" },
        {
          kind: "p",
          text: "If an artisan cancels a confirmed job, Zart will either:"
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            { text: "Assign a replacement artisan, or" },
            { text: "Issue a refund at Zart's discretion." }
          ]
        }
      ]
    },
    {
      id: "refund-eligibility",
      number: "3",
      title: "Refund eligibility",
      blocks: [
        { kind: "p", text: "Refunds may be considered if:" },
        {
          kind: "list",
          style: "bullet",
          items: [
            { text: "The artisan fails to show up without notice." },
            { text: "The job is not started at all." },
            {
              text: "The service delivered is materially different from what was agreed upon."
            }
          ]
        },
        { kind: "p", text: "Refunds will not be issued if:" },
        {
          kind: "list",
          style: "bullet",
          items: [
            {
              text: "The customer changes their mind after work has started."
            },
            {
              text: "Dissatisfaction is based on personal preference rather than service quality."
            },
            {
              text: "The customer interferes with or alters the agreed scope of work."
            }
          ]
        }
      ]
    },
    {
      id: "partial-refunds",
      number: "4",
      title: "Partial refunds",
      blocks: [
        { kind: "p", text: "Where applicable, Zart may issue:" },
        {
          kind: "list",
          style: "bullet",
          items: [
            { text: "A partial refund, or service credit for future use." },
            {
              text: "This applies when work has already begun or costs have been incurred."
            }
          ]
        }
      ]
    },
    {
      id: "refund-processing-time",
      number: "5",
      title: "Refund processing time",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            {
              text: "Approved refunds are processed within 5 to 10 business days."
            },
            {
              text: "Refunds are issued via the original payment method where possible."
            }
          ]
        }
      ]
    },
    {
      id: "final-decision",
      number: "6",
      title: "Final decision",
      blocks: [
        {
          kind: "p",
          text: "All refund decisions are made at Zart's discretion after reviewing:"
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            { text: "Job details" },
            { text: "Communication records" },
            { text: "Artisan reports" },
            { text: "Customer feedback" }
          ]
        }
      ]
    },
    {
      id: "contact",
      number: "7",
      title: "Contact",
      blocks: [
        { kind: "p", text: "For refund requests, contact:" },
        {
          kind: "p",
          text: "[support@zarthq.com](mailto:support@zarthq.com)"
        }
      ]
    }
  ]
};
