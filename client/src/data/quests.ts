import type { Quest } from "../game/types";

export const QUESTS:Quest[] = [
    {
        id: "quest1",
        name: "The Last Good Bank",
        fights: 2,
        rewardType: "weapon",
        isBoss: false
      },
      {
        id: "quest2",
        name: "Debt District",
        fights: 2,
        rewardType: "armor",
        isBoss: false
      },
      {
        id: "quest3",
        name: "The Investment Vault",
        fights: 3,
        rewardType: "ability",
        isBoss: false
      },
      {
        id: "boss",
        name: "Influx Core",
        fights: 1,
        isBoss: true
      }
    
];