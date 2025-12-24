//Concrete Strategies

public class CashPayment implements PaymentStrategy{
    private String branchLocation;

    public CashPayment(String branchLocation){
        this.branchLocation=branchLocation;
    }

    @Override
    public void pay(double amount){
        System.out.println("Processing Cash Payment....");
        System.out.println("Branch Location: " + branchLocation);
        System.out.println("Payment of LKR "+amount+" received in Cash.\n");
    }
}
