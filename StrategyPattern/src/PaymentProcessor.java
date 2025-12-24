//Context Class
//Executes the selected payment strategy dynamically

public class PaymentProcessor {
    private PaymentStrategy paymentStrategy;

    //Set the Stratergy dynamically
    public void setPaymentStrategy(PaymentStrategy paymentStrategy){
        this.paymentStrategy=paymentStrategy;
    }

    //Execute the payment
    public void executePayment(double amount){
        if (paymentStrategy == null){
            System.out.println("Error: No payment Strategy Selected!\n");
            return;
        }
        paymentStrategy.pay(amount);
    }
}
