const ExpenseSchema = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    // console.log(req.body)
    const { title, amount, type, date, category, description } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        if(!title || !category || !description || !date  ){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if(amount <=0 || !amount === 'number'){            
            return res.status(400).json({
                message: "Amount must be a positive number"
            })
        }
        await expense.save()

        res.status(200).json({
            message: "Expense added successfully"
        })
    }catch (error) {
        res.status(500).json({
            message: "Server error"
        })

    }
    console.log(expense)
}    

exports.getExpense = async (req, res) => {

    try{
        const expense = await ExpenseSchema.find().sort({cretedAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            if (expense) { // Check if expense was deleted
                res.status(200).json({ message: "Expense deleted" });
                // Optionally fetch expenses here after successful deletion
              } else {
                res.status(404).json({ message: "Expense not found" });
              }
            // res.status(200).json({
            //     message: "Expense deleted"
            // })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Server error"
            })
        })


    // try{
    //     const expense = await ExpenseSchema.find().sort({cretedAt: -1})
    //     res.status(200).json(expense)
    // } catch (error) {
    //     res.status(500).json({
    //         message: "Server error"
    //     })
    // }
}