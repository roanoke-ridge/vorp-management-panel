import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const characters: number = await ctx.prisma.characters.count();
    const users: number = await ctx.prisma.users.count();

    const aggregatedMoney = await ctx.prisma.characters.aggregate({ _sum: { money: true } });
    const aggregatedGold = await ctx.prisma.characters.aggregate({ _sum: { gold: true } });

    const pocketMoney: number = aggregatedMoney._sum.money || 0;
    const pocketGold: number = aggregatedGold._sum.gold || 0;

    const banks = await ctx.prisma.bank_users.groupBy({
      by: ['name'],
      _sum: {
        money: true,
        gold: true
      }
    });

    let totalBankCash = 0;
    let totalBankGold = 0;
    const allBanks = banks.reduce((banks, bank) => {
      totalBankCash += bank._sum.money || 0;
      totalBankGold += bank._sum.gold || 0;
      return {
        ...banks,
        [bank.name]: {
          cash: bank._sum.money,
          gold: bank._sum.gold
        }
      }
    }, {})

    return {
      characters,
      users,
      money :{
        totalMoney: pocketMoney + totalBankCash,
        totalGold: pocketGold + totalBankGold,
        banks: allBanks
      }
    }
  })
});
