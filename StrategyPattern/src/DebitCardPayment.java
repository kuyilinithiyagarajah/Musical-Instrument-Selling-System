//Concrete Strategies

public class DebitCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cardHolder;
    private String bankName;

    public DebitCardPayment(String cardNumber,String cardHolder,String bankName){
        this.cardNumber=cardNumber;
        this.cardHolder=cardHolder;
        this.bankName=bankName;
    }

    @Override
    public void pay(double amount){
        System.out.println("Processing Debit Card Payment....");
        System.out.println("Card Holder: "+cardHolder+" | Bank: "+ bankName);
        System.out.println("Amount: LKR "+amount);
        System.out.println("Payment Successful via Debit Card. \n");
    }

}
