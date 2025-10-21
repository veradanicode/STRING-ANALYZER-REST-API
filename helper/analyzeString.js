const crypto =require('crypto');

const analyzeString = (value) => {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const reversed = normalized.split("").reverse().join("");
  const is_palindrome = normalized === reversed;

  const character_frequency_map = {};
  for (let char of value) {
    if (char !== " ") {
      character_frequency_map[char] = (character_frequency_map[char] || 0) + 1;
    }
  }

  return {
    length: value.length,
    is_palindrome,
    unique_characters: new Set(value.replace(/\s+/g, "")).size,
    word_count: value.trim().split(/\s+/).length,
    sha256_hash: crypto.createHash("sha256").update(value).digest("hex"),
    character_frequency_map
  };
};

module.exports=analyzeString;