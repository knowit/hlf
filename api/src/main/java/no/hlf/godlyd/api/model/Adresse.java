package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "adresse")
    private Set<Sted> steder;

    public Adresse(String gatenavn, String gatenummer, @NotBlank @NotNull String by, @NotBlank @NotNull String postnummer) {
        this.gatenavn = gatenavn;
        this.gatenummer = gatenummer;
        this.by = by;
        this.postnummer = postnummer;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { this.id = id; }
    /* MERK: Dersom disse er her kan man ikke POSTE til adresser
    public Set<Sted> getSteder() { return steder; }

    public void setSteder(Set<Sted> steder) { this.steder = steder; }
    */
    public String getGatenavn() { return gatenavn; }

    public void setGatenavn(String gatenavn) { this.gatenavn = gatenavn; }

    public String getGatenummer() { return gatenummer; }

    public void setGatenummer(String gatenummer) { this.gatenummer = gatenummer; }

    public String getBy() { return by; }

    public void setBy(String by) { this.by = by; }

    public String getPostnummer() { return postnummer; }

    public void setPostnummer(String postnummer) { this.postnummer = postnummer; }

}
