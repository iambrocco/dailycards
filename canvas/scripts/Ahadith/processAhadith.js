fetch("./scripts/Ahadith/6307hadith.json")
  .then((response) => response.json())
  // .then((data) => {
  //   let ahadith = [];
  //   data.forEach((hadith) => {
  //     ahadith.push({
  //       hadith: hadith.hadithArabic,
  //       number: hadith.hadithNumber,
  //       chapter: hadith.chapter,
  //     });
  //   });
  //   console.log(ahadith);
  // })

  .then((data) => {
    // Enhanced keywords for identifying sanad and matn
    const matnKeywords = [
      "قَالَ سَمِعْتُ رَسُولَ اللَّهِ",
      "قَالَ تَسَحَّرْنَا",
      "قَالَ قُلْنَا",
      "أَخْبَرَهُ قَالَ",
      "قَالَ لِي",
      "لَقَدْ",
      "قَالَ بَيْنَا",
      "قَالَ لَنَا",
      "ابْنَ عَبَّاسٍ",
      "قَالَ النَّبِيُّ",
      "ابْنِ عَبَّاسٍ",
      "نَهَى النَّبِيُّ",
      "نَهَى رَسُولُ اللَّهِ",
      "سَمِعْتُ النَّبِيَّ",
      "يَبْلُغُ بِهِ النَّبِيَّ",
      "يَبْلُغُ بِهِ رَسُولَ اللَّهِ",
      "يَقُولُ",
      "قَالَ قَامَ",
      "قَالَ أَتَى",
      "قَالَ أَتَتْ",
      "أَنَّ رَجُلاً",
      "قَالَتْ كَانَ",
      "إِنَّ رَسُولَ",
      "إِنَّ النَّبِيَّ",
      "قُلْتُ يَا رَسُولَ اللَّهِ",
      "قَالَ يَا رَسُولَ اللَّهِ",
      "أَتَتْ رَسُولَ اللَّهِ",
      "أَتَى رَسُولَ اللَّهِ",
      "أَنَّهُ سَمِعَ رَسُولَ اللَّهِ",
      "أَنَّهُ سَمِعَ النَّبِيَّ",
      "قَالَ سَمِعْتُ رَسُولَ اللَّهِ",
      "قَالَ كُنْتُ",
      "قَالَ شُكِيَ إِلَى النَّبِيِّ",
      "قَالَ مَرَّ النَّبِيُّ",
      "قَالَ مَرَّ رَسُولُ اللَّهِ",
      "قَالَ شُكِيَ إِلَى رَسُولِ اللَّهِ",
      "قَالَ بَيْنَمَا",
      "قَالُوا يَا رَسُولَ اللَّهِ",
      "يَقُولُ سَمِعْتُ رَسُولَ اللَّهِ",
      "قَالَ كَانَ النَّبِيُّ",
      "قَالَ بَايَعْتُ رَسُولَ اللَّهِ",
      "عَنْ رَسُولِ اللَّهِ",
      "قَالَ جَاءَ",
      "كَانَ أَصْحَابُ رَسُولِ اللَّهِ",
      "كَانَ أَصْحَابُ النَّبِيِّ",
      "عَنْ عَبْدِ اللَّهِ،",
      "قَالَ أُتِيَ رَسُولُ اللَّهِ",
      "قَالَ أُتِيَ النَّبِيُّ",
      "كَانَ",
      "كَانَ رَسُولُ اللَّهِ",
      "كَانَ النَّبِيَُّ",
      "كَانَ لِلنَّبِيِّ",
      "شَكَتْ",
      "شَكَى",
      "قُلْتُ",
      " أَشْهَدُ ",
      "يَرْفَعُهُ",
      "أَنَّهُ ذُكِرَ",
      "أَنَّ عَائِشَةَ، زَوْجَ النَّبِيِّ",
      "تَرْفَعُهُ",
      "قَالَتْ",
      " مَا ",
      "كَانَ لِرَسُولِ اللَّهِ",
      "قَالَ حَدَّثَنَا رَسُولُ اللَّهِ",
      "قَالَ حَدَّثَنَا النَّبِيُّ",
      "قِيلَ يَا رَسُولَ اللَّهِ",
      "قَالَ نَظَرَ النَّبِيُّ",
      "قَالَ نَظَرَ رَسُولُ اللَّهِ",
      "أَنَّهُ مَشَى إِلَى النَّبِيِّ",
      "قَالَ كُنَّا",
      "عَنِ النَّبِيِّ",
      "أَنَّ رَسُولَ اللَّهِ",
      "أَنَّ رَسُولَ اللَّهِ",
      "أَنَّ النَّبِيَّ",
      "قَالَ خَرَجْنَا",
      "أَنَّهُ قَالَ لِرَسُولِ اللَّهِ",
      "أَنَّهُ قَالَ لِرَسُولِ اللَّهِ",
      "أَنَّهُ قَالَ لِلنَّبِيِّ",
      "أَنَّ النَّبِيَّ",
      "قَالَ بَيْنَمَا النَّبِيُّ",
      "قَالَ النَّبِيُّ",
      "سَأَلَ رَسُولَ اللَّهِ",
      "سُئِلَ",
      "قَالَ رَسُولُ اللَّهِ",
      "بَيْنَمَا كُنَّا مَعَ النَّبِيِّ",
      "قَالَ كَانَ رَسُولُ اللَّهِ",
      "ذَكَرَ النَّبِيُّ",
      "قَالَ قَالُوا",
      "عَنِ النَّبِيِّ",
      "سَأَلَ النَّبِيَّ",
      "مَعَ رَسُولِ اللَّهِ",
    ];
    const sanadKeywords = [
      "حَدَّثَنَا",
      "قَالَ حَدَّثَنَا",
      "أَنَّهُ سَمِعَ",
      "أَخْبَرَنِي",
      "قَالَ قَالَ",
      "حَدَّثَنِي",
      "، قَالَ",
      "يَقُولُ",
    ];
    /**
     * Finds the earliest matn keyword position in the hadith text.
     */
    function findMatnStartIndex(hadith) {
      let matnIndex = -1;
      matnKeywords.forEach((keyword) => {
        const index = hadith.indexOf(keyword);
        if (index !== -1 && (matnIndex === -1 || index < matnIndex)) {
          matnIndex = index;
        }
      });
      return matnIndex;
    }
    /**
     * Finds the last sanad keyword before the matn starts.
     */
    function findLastSanadKeywordBefore(hadith, matnIndex) {
      let lastSanadKeyword = "";
      let lastSanadKeywordIndex = -1;
      sanadKeywords.forEach((keyword) => {
        const index = hadith.lastIndexOf(keyword, matnIndex - 1);
        if (index !== -1 && index > lastSanadKeywordIndex) {
          lastSanadKeyword = keyword;
          lastSanadKeywordIndex = index;
        }
      });
      return lastSanadKeyword;
    }
    /**
     * Splits sanad into an array of narrators and cleans the text.
     */
    function splitSanadToNarrators(sanad) {
      // Find the first occurrence of '"'
      const firstQuoteIndex = sanad.indexOf('"');
      // Split sanad into two parts: before and after the first '"'
      const beforeQuote =
        firstQuoteIndex !== -1 ? sanad.slice(0, firstQuoteIndex) : sanad;
      const afterQuote =
        firstQuoteIndex !== -1 ? sanad.slice(firstQuoteIndex) : "";
      // Split the part before the quote using key delimiters
      const narratorsBeforeQuote = beforeQuote
        .split(/عن |قال|،|:/)
        .map((part) => part.trim())
        .filter((part) => part && !sanadKeywords.includes(part)); // Exclude empty or keyword-like parts
      // Combine the narrators before the quote with the unprocessed part after the quote
      const narrators = [...narratorsBeforeQuote];
      if (afterQuote) narrators.push(afterQuote.trim());
      return narrators;
    }
    /**
     * Main function: Separates sanad, matan, extracts narrators, and detects the last sanad keyword.
     */
    function processHadith(hadith) {
      const matnIndex = findMatnStartIndex(hadith.hadithArabic);
      if (matnIndex !== -1) {
        // Find the matn keyword used for splitting
        const matanKeyword = matnKeywords.find((keyword) =>
          hadith.hadithArabic.startsWith(keyword, matnIndex)
        );
    
        // Separate sanad and matn
        const sanad = hadith.hadithArabic.slice(0, matnIndex).trim();
        const matan = hadith.hadithArabic.slice(matnIndex).trim();
    
        // Find narrators and the last sanad keyword
        const narrators = splitSanadToNarrators(sanad);
        const lastSanadKeyword = findLastSanadKeywordBefore(
          hadith.hadithArabic,
          matnIndex
        );
        const lastNarrator = narrators[narrators.length - 1] || "";
    
        return {
          sanad,
          narrators,
          matan,
          matanKeyword: matanKeyword || "",
          lastNarrator,
          lastSanadKeyword,
          chapter: hadith.chapter,
          hadithNumber: hadith.hadithNumber,
        };
      }
      // If no clear matn detected, return the hadith as is
      const narrators = splitSanadToNarrators(hadith.hadithArabic);
      return {
        sanad: hadith.hadithArabic,
        narrators,
        matan: "",
        matanKeyword: "",
        lastNarrator: "",
        lastSanadKeyword: "",
        chapter: hadith.chapter,
        hadithNumber: hadith.hadithNumber,
      };
    }
    
    /**
     * Process all hadiths and extract relevant data.
     */
    const processedAhadith = data.map((hadith) => processHadith(hadith));
    // Log results for debugging
    console.log(processedAhadith);
  });
