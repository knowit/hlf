package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "brukere")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Bruker implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String auth0UserId;

    private String fornavn;
    private String etternavn;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "registrator")
    private Set<Vurdering> vurderinger;


    // Getters og setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getAuth0UserId(){
        return auth0UserId;
    }

    public void setAuth0UserId(String auth0UserId){
        this.auth0UserId = auth0UserId;
    }

    public String getFornavn() { return fornavn; }

    public void setFornavn(String fornavn) { this.fornavn = fornavn; }

    public String getEtternavn() { return etternavn; }

    public void setEtternavn(String etternavn) { this.etternavn = etternavn; }


    public Set<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(Set<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
