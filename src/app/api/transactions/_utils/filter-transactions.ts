import { isFuture } from 'date-fns'

import { Transaction, TransactionsFilters } from '@/data/types/all'
import { filterByString } from '@/data/utils/filter-by-string'
import { sortByOrder } from '@/data/utils/sort'

import { formatAmount } from './format-amount'
import { paginate } from './paginate'

export function filterTransactions(
  transactions: Transaction[],
  {
    from,
    until,
    account,
    industry,
    state,
    status,
    limit,
    page,
  }: TransactionsFilters,
) {
  const orderedByDate = sortByOrder({
    arr: transactions,
    attr: 'date',
    type: 'asc',
  })

  const filteredByDate = orderedByDate.filter(
    ({ date }: Transaction) =>
      new Date(date) > new Date(from) && new Date(date) < new Date(until),
  )

  const formatted = filteredByDate.map(
    ({ amount, date, ...transaction }: Transaction) => ({
      amount: formatAmount(amount),
      date: new Date(date),
      status: isFuture(new Date(date)) ? 'pending' : 'pay',
      ...transaction,
    }),
  )

  const filtered = filterByString(formatted, {
    account,
    industry,
    state,
    status,
  })

  return paginate(filtered, { page, limit })
}