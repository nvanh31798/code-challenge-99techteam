interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    return BlockchainPriority[blockchain as keyof typeof BlockchainPriority] ?? BlockchainPriority.Default;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance, index) => {
        const formattedBalance: FormattedWalletBalance = {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
        const usdValue = prices[formattedBalance.currency] * formattedBalance.amount;

        return (
          <WalletRow
            className={classes.row}
            key={`${formattedBalance.currency}-${index}`}
            amount={formattedBalance.amount}
            usdValue={usdValue}
            formattedAmount={formattedBalance.formatted}
          />
        );
      })}
    </div>
  );
};
