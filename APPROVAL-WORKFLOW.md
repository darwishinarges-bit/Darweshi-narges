# Approval Workflow

## Contact Messages

Contact messages are private. They are collected in Netlify Forms under:

`contact-message`

These messages are not published on the website.

## Critic Short Notes

Reader notes and short reviews are collected in Netlify Forms under:

`short-note-review`

To approve and publish one:

1. Open Netlify Forms.
2. Open `short-note-review`.
3. Read the submitted note.
4. Copy approved notes into `/admin`.
5. In Decap CMS, open `Criticism & Reviews`.
6. Add an approved entry with type `Short Note`.
7. Paste the submitted note into `English Quote or Note`.
8. Publish.

Longer critical essays and research papers should be added directly in `/admin` as `Critical Essay` or `Research Paper`.

## Newsletter Subscriptions

Newsletter emails are collected in Netlify Forms under:

`newsletter-subscription`

Export the submissions as CSV from Netlify Forms, then import the emails into a newsletter service such as Buttondown, Mailchimp, Brevo, or Substack before sending a campaign.

## Automatic Subscription Confirmation

The site includes a Netlify Function that can send a thank-you confirmation email after someone subscribes.

To turn it on in Netlify:

1. Create a free Resend account.
2. Add and verify the email address or domain you want to send from.
3. In Netlify, open Site configuration > Environment variables.
4. Add `RESEND_API_KEY` with your Resend API key.
5. Add `NEWSLETTER_FROM_EMAIL` with the verified sender email.
6. Optional: add `NEWSLETTER_AUTHOR_NAME` with `Narges Darweshi`.
7. Redeploy the site.

Netlify Forms stores the subscriber. Resend sends the automatic thank-you email.
