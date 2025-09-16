import voucher_codes from "voucher-code-generator";

const couponGen = (length, prefix, postfix) => {
  let code = voucher_codes.generate({
    length: length,
    count: 1,
    prefix: prefix,
    postfix: postfix,
  });
  return code;
};

export { couponGen };