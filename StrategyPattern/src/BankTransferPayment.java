//Concrete Strategies

public class BankTransferPayment implements PaymentStrategy {
    private String accountNumber;
    private String bankName;

    public BankTransferPayment(String accountNumber,String bankName){
        this.accountNumber=accountNumber;
        this.bankName=bankName;
    }

    @Override
    public void pay(double amount){
        System.out.println("Initiating Bank Transfer.....");
        System.out.println("Bank: "+bankName + ", Account No: "+accountNumber);
        System.out.println("Transferred LKR "+ amount + " Successfully via bank transfer.\n");
    }
}
