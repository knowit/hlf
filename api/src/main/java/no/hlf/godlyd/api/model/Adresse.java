package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "adresser")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Adresse implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String gatenavn;

    private String gatenummer;

    @NotBlank
    @NotNull
    private String by;

    @NotBlank
    @NotNull
    private String postnummer;

    @JsonBackReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "adresse")
    private Set<Sted> steder;


    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { this.id = id; }

    public Set<Sted> getSteder() { return steder; }

    public void setSteder(Set<Sted> steder) { this.steder = steder; }

    public void setAdresseId(Integer id) { this.id = id; }

    public String getGatenavn() {
        return gatenavn;
    }

    public void setGatenavn(String gatenavn) { this.gatenavn = gatenavn; }

    public String getGatenummer() {
        return gatenummer;
    }

    public void setGatenummer(String gatenummer) { this.gatenummer = gatenummer; }

    public String getBy() {
        return by;
    }

    public void setBy(String by) { this.by = by; }

    public String getPostnummer() { return postnummer; }

    public void setPostnummer(String postnummer) { this.postnummer = postnummer; }

}
