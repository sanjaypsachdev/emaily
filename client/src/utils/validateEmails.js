const re =
/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const validateEmails = (emails) => {

  if (!emails) return

  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !re.test(email))

  if (invalidEmails.length > 0) {
    return `These emails are invalid: ${invalidEmails}`
  }

  return
}

export default validateEmails