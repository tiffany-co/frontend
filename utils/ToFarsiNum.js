function toFarsiNumeral(en, separat = true) {
  let numStr = "" + Number(en).toFixed(1);
  numStr = numStr.slice(-2) === ".0" ? Math.floor(en).toString() : numStr;
  var length = 3,
    separator = ",",
    count = 0,
    result = numStr
      .split("")
      .reduceRight((a, c) => {
        if (count === length) {
          a.push(separator);
          count = 1;
        } else count++;
        a.push(c);
        return a;
      }, [])
      .reverse()
      .join("");
  return (separat ? result : "" + en).replace(/[0-9]/g, function (t) {
    return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t + 1);
  });
}

export default toFarsiNumeral;
