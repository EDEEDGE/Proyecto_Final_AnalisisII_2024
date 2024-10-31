const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    const msg = {
        to: to, 
        from: 'panqueto55@gmail.com',
        subject: subject,
        text: text,
        html: html,
    };

    try{
        await sgMail.send(msg);
        res.status(200).json({ mensaje: 'Correo enviado correctamente...', data: msg });
    } catch (error){
        console.error('Error al enviar el correo...', error);
        res.status(500).json('Error en el servidor...');
    }


};

module.exports = { sendMail };