package br.com.aurum.astrea.dao;

import br.com.aurum.astrea.domain.Contact;
import com.googlecode.objectify.ObjectifyService;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class ContactDao {

    static {
        ObjectifyService.register(Contact.class);
    }

    public void save(Contact contact) {
        ofy().save().entity(contact).now();
    }

    public List<Contact> list() {
        return ofy().load().type(Contact.class).list();
    }

    public void delete(Long id) {
        Contact contact = ObjectifyService.ofy().load().type(Contact.class).id(id).now();
        if (contact != null) {
            ofy().delete().entity(contact).now();
        }
    }
}
