import { Badges } from "@/types";

class Badge {
  title: string;

  description: string;

  imgSrc?: string;
}

export class BasicBadge extends Badge {
  title = "Profile Setup Complete";

  description = `Congrats! Your profile setup is done. Welcome to Lumina!
  Start exploring, connecting, and enjoying your journey with us!`;

  imgSrc = "/assets/images/badges/basic_badge.png";
}
export class UserBadge extends Badge {
  title = "Welcome to the Cummunity!";

  description = `🚀 Exciting news!
  You've been granted special access to vote and review projects, thanks to a Badge Holder. Ready to make your mark?`;
}
export class HolderBadge extends Badge {
  title = "Welcome, Badge Holder!";

  description = `🎉 Awesome news!
  You're one of our Badge Holders. This means you get special voting privileges and can write reviews about projects. Let’s make an impact together!`;
}

export const AllBadges = {
  [Badges.BASE]: new BasicBadge(),
  [Badges.USER]: new UserBadge(),
  [Badges.HOLDER]: new HolderBadge()
};
