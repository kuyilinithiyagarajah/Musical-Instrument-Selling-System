//Concrete Stratergies

public class CreditCardPayment  implements PaymentStrategy  {
    private String cardNumber;
    private String cardHolder;
    private String expiryDate;

    public CreditCardPayment(String cardNumber,String cardHolder,String expiryDate){
        this.cardNumber =cardNumber;
        this.cardHolder=cardHolder;
        this.expiryDate=expiryDate;
    }

    @Override
    public void pay(double amount){
        System.out.println("Processing Credit Card Payment....");
        System.out.println("Card Holder: "+cardHolder);
        System.out.println("Amount: LKR "+ amount);
        System.out.println("Payment successful via Credit Card.\n");
    }
}
