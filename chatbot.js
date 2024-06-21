// chatbot.js
const items = { 1: "Pizza", 2: "Burger", 3: "Salad" };

function handleUserInput(session, message) {
  switch (message) {
    case "1":
      return {
        text: "Please select items: \n1. Pizza \n2. Burger \n3. Salad \nEnter item number to add to your order.",
        session,
      };
    case "99":
      if (session.currentOrder.length > 0) {
        session.orderHistory.push(session.currentOrder);
        session.currentOrder = [];
        return {
          text: "Order placed. Would you like to place a new order?",
          session,
        };
      } else {
        return { text: "No order to place.", session };
      }
    case "98":
      return {
        text: `Order history: ${session.orderHistory
          .map((order) => order.join(", "))
          .join(" | ")}`,
        session,
      };
    case "97":
      return {
        text: `Current order: ${session.currentOrder.join(", ")}`,
        session,
      };
    case "0":
      session.currentOrder = [];
      return { text: "Order canceled.", session };
    default:
      const item = getItemFromMessage(message);
      if (item) {
        session.currentOrder.push(item);
        return {
          text: `${item} added to your order. Would you like to add more items?`,
          session,
        };
      } else {
        return { text: "Invalid option. Please try again.", session };
      }
  }
}

function getItemFromMessage(message) {
  return items[message];
}

module.exports = { handleUserInput };
