const parseNaturalLanguageQuery = (query) => {
  const parsed = {};

  const lower = query.toLowerCase();

  if (lower.includes("palindromic")) parsed.is_palindrome = true;
  if (lower.includes("single word")) parsed.word_count = 1;

  const lengthMatch = lower.match(/longer than (\d+)/);
  if (lengthMatch) parsed.min_length = parseInt(lengthMatch[1]) + 1;

  const charMatch = lower.match(/letter (\w)/);
  if (charMatch) parsed.contains_character = charMatch[1];

  return parsed;
};

module.exports = parseNaturalLanguageQuery;