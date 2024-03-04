type StatisticProps = {
    revenuesCount: number
    revenuesCurrentValue: number
    revenuesMonthlyValue: number
    availableCash: number
    spentCash: number
    isCollapsed: (value: boolean) => void
};
export const Statistic = ({
                              revenuesCount,
                              revenuesMonthlyValue,
                              revenuesCurrentValue,
                              availableCash,
                              spentCash,
                              isCollapsed
                          }: StatisticProps) => {
    return (
        <div className={'revenuesStatistic'}>
            <button onClick={() => isCollapsed(true)}>Скрыть статистику</button>
            <h3>Количество источников дохода: {revenuesCount}</h3>
            <h3>Получено дохода в этом месяце: {revenuesCurrentValue}</h3>
            <h3>Ожидаемый доход в этом месяце: {revenuesMonthlyValue}</h3>
            <h3>Разполагаемая наличность: {availableCash}</h3>
            <h3>Потрачено в этом месяце: {spentCash}</h3>
        </div>
    );
};