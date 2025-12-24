public class musicalinstrumentPaymentDemo {
    public static void main(String[] args) {

        System.out.println(".......Vehicle Insurance Payment System......\n");

        PaymentProcessor paymentProcessor = new PaymentProcessor();

        // 01 Credit card payment
        PaymentStrategy creditCard = new CreditCardPayment("1234-567-9012-3456","Gaveesha M","12/27");
        paymentProcessor.setPaymentStrategy(creditCard);
        paymentProcessor.executePayment(15000.00);

        // 02 Debit Card Payment
        PaymentStrategy debitCard = new DebitCardPayment("4567-1234-7890-5555", "M. Tharindu", "Sampath Bank");
        paymentProcessor.setPaymentStrategy(debitCard);
        paymentProcessor.executePayment(12000.00);

        // 03 Bank Transfer Payment
        PaymentStrategy bankTransfer = new BankTransferPayment("00988765432", "People's Bank");
        paymentProcessor.setPaymentStrategy(bankTransfer);
        paymentProcessor.executePayment(20000.00);

        // 04 Cash Payment
        PaymentStrategy cashPayment = new CashPayment("Colombo Main Branch");
        paymentProcessor.setPaymentStrategy(cashPayment);
        paymentProcessor.executePayment(8000.00);

        // Test: No Strategy Selected
        System.out.println(".......Testing with no selected payment method.......");
        PaymentProcessor testProcessor = new PaymentProcessor();
        testProcessor.executePayment(5000.00);
    }
}
