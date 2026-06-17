const RESEND_API_URL = "https://api.resend.com/emails";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL;
  const authorName = process.env.NEWSLETTER_AUTHOR_NAME || "Narges Darweshi";

  if (!apiKey || !fromEmail) {
    return jsonResponse(500, {
      error: "Newsletter email is not configured yet."
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, { error: "Invalid request body" });
  }

  const email = String(payload.email || "").trim();
  const language = payload.language === "fa" ? "fa" : "en";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(400, { error: "A valid email address is required." });
  }

  const isPersian = language === "fa";
  const subject = isPersian
    ? "عضویت شما تایید شد"
    : "Your subscription is confirmed";
  const preview = isPersian
    ? "سپاسگزاریم که به نامه ماهانه نرگس درویشی پیوستید."
    : "Thank you for joining Narges Darweshi's monthly letter.";
  const html = isPersian
    ? `<div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8; color: #222;">
        <p>سلام،</p>
        <p>سپاسگزاریم که به نامه ماهانه ${authorName} پیوستید.</p>
        <p>از این پس نوشته‌های تازه، خبرهای کتاب، و یادداشت‌های ادبی برای شما فرستاده خواهد شد.</p>
        <p>با مهر،<br>${authorName}</p>
      </div>`
    : `<div style="font-family: Georgia, serif; line-height: 1.7; color: #222;">
        <p>Hello,</p>
        <p>Thank you for joining ${authorName}'s monthly letter.</p>
        <p>You will receive new writings, book news, and literary notes when they are sent.</p>
        <p>Warmly,<br>${authorName}</p>
      </div>`;

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `${authorName} <${fromEmail}>`,
      to: email,
      subject,
      html,
      text: preview
    })
  });

  if (!response.ok) {
    return jsonResponse(502, {
      error: "The confirmation email could not be sent."
    });
  }

  return jsonResponse(200, { ok: true });
};
