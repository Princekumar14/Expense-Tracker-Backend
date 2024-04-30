const IncomeSchema = require('../models/IncomeModel')

exports.addIncome = async (req, res) => {
    // console.log(req.body)
    const { title, amount, type, date, category, description } = req.body

    const income = IncomeSchema({
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
        await income.save()

        res.status(200).json({
            message: "Income added successfully"
        })
    }catch (error) {
        res.status(500).json({
            message: "Server error"
        })

    }
    console.log(income)
}    

exports.getIncomes = async (req, res) => {

    try{
        const income = await IncomeSchema.find().sort({cretedAt: -1})
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}


exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({
                message: "Income deleted"
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Server error"
            })
        })


    try{
        const income = await IncomeSchema.find().sort({cretedAt: -1})
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}