

// Define the relevant keywords for each category
const categories = {
    Gaming: [
      "game",
      "gaming",
      "console",
      "playstation",
      "pc",
      "controller",
      "multiplayer",
      "online",
      "gamers",
      "vr",
      "esports",
      "FPS",
      "RPG",
      "MMORPG",
      "strategy",
    ],
  
    Deals: [
      "deal",
      "sale",
      "offer",
      "sales"
    ],
  
    Hardware: [
      "hardware",
      "technology",
      "device",
      "computer",
      "laptop",
      "desktop",
      "components",
      "peripherals",
      "cpu",
      "gpu",
      "ram",
      "storage",
      "monitor",
      "keyboard",
      "mouse",
      "headphones",
      "nvidia",
      "amd",
      "intel",
      "e-bike",
      "bike",
      "tv",
      "intel",
    ],
  
    Mobile: [
      "mobile",
      "phone",
      "smartphone",
      "apple",
      "iphone",
      "Samsung",
      "Galaxy",
      "Android",
      "iOS",
      "cellphone",
      "mobile gaming",
      "apps",
      "camera",
      "battery",
      "screen",
      "wireless",
      "5G",
    ],
  
    Software: [
      "software",
      "iOS",
      "Android",
      "operating system",
      "app",
      "program",
      "coding",
      "development",
      "updates",
      "compatibility",
      "user interface",
      "performance",
      "security",
      "bug",
      "patch",
      "window",
    ],
  
    Review: [
      "review",
      "reviewing",
      "reviewed",
      "rating",
      "opinion",
      "evaluation",
      "critique",
      "feedback",
      "recommendation",
      "pros",
      "cons",
      "impressions",
      "analysis",
      "assessment",
      "experience",
      "vs",
    ],
  };



export const getArticleCategory = (title, description) => {
    for (const category in categories) {
      const keywords = categories[category];
      const foundInTitle = keywords.some(keyword =>
        title.toLowerCase().includes(keyword)
      );
      const foundInDescription = keywords.some(keyword =>
        description.toLowerCase().includes(keyword)
      );
  
      if (foundInTitle || foundInDescription) {
        return category;
      }
    }
    return "General";
  };
  