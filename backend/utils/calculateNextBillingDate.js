const calculateNextBillingDate = () => {
  const oneMonthFormNow = new Date();
  oneMonthFormNow.setMonth(oneMonthFormNow.getMonth() + 1);
  return oneMonthFormNow;
};

module.exports = { calculateNextBillingDate };
