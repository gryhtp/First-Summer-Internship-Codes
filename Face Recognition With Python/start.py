from tkinter import Button, Frame, Tk
import login
import exit
import fotosave

pencere = Tk()

pencere.title("Yüz Tanıma Sistemi")
pencere.geometry("700x400")

uygulama = Frame(pencere, padx = 100,pady = 100)
uygulama.grid(padx = 40, pady = 40)

def clik_me():
    login.main()

def clik_me1():
    exit.main()

def clik_me2():
    fotosave.main()

loginbtn = Button(uygulama, text = " Giriş Yap " , command=clik_me)
loginbtn.grid(row=0, column=1)

exitbtn = Button(uygulama, text = " Çıkış Yap " , command=clik_me1)
exitbtn.grid(row=0, column=2)

usersave = Button(uygulama, text = " Kullanıcı Kaydet " , command=clik_me2)
usersave.grid(row=0, column=3)

close = Button(pencere, text = "Uygulamayı Kapat", command = uygulama.quit)
close.grid(row=0, column=4)

pencere.mainloop()