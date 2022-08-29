using System;
using System.Collections.Generic;
using System.Text;

namespace WpfChatApp.Classes
{
    internal class Person
    {
        private string name { get; set; }
        private int phoneNumber { get; set; }
        private List<Person> contacts { get; set; }

        public Person(string Name, int PhoneNumber)
        {
            this.name = Name;
            this.phoneNumber = PhoneNumber;
            this.contacts = new List<Person>();
        }

        public void OpenChatWithAPerson(Person person)
        {
            //return new Chat(person);
        }

        public void SendMessage(string content)
        {
            //return new Message(content);
        }

        public void OpenGroup(Person[] people)
        {
            //return new Group(people);
        }
    }
}
